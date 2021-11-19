import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import { table2 } from '../../db/table2.db';
import { House } from '../../models/house';
import * as uuid from 'uuid';

@Component({
  selector: 'house2',
  templateUrl: './house2.component.html',
  styleUrls: ['./house2.component.scss'],
})
export class House2Component implements OnInit, OnChanges {
  @Output() house2Transfered = new EventEmitter();
  @Input() newHouse!: House;

  public House: House;
  public Houses: House[];
  public stringById: string;

  constructor() {
    this.House = new House('', 0, '', 0, 0, 0);
    this.Houses = table2;
    this.stringById = '';
  }

  ngOnChanges() {
    if (this.newHouse != null && this.newHouse != undefined) {
      table2.push(this.newHouse);
      this.showData(table2);
    }
  }

  ngOnInit(): void {}

  showData(array: House[]): void {
    this.Houses = array;
  }

  /* CREAR UNO NUEVO */
  create(form: any, formValidate = true) {
    let houseId = 1;

    table2.map((data) => {
      houseId = data.houseId + 1;
    });

    this.House._id = uuid.v4();

    this.House.houseId = houseId;

    if (
      !this.House._id ||
      !this.House.cellphone ||
      !this.House.house ||
      !this.House.houseId ||
      !this.House.rooms ||
      !this.House.wc
    ) {
      alert('Campos invalidos');
      return;
    }

    table2.push(this.House);

    this.House = new House('', 0, '', 0, 0, 0);

    this.showData(table2);

    if (formValidate) {
      form.reset();
    }
  }

  /* EDITAR */
  get(home: House) {
    this.House = { ...home };
  }

  /* ACTUALIZAR */
  update() {
    table2.map((data, index) => {
      if (data._id == this.House._id) {
        table2[index] = this.House;
      }
    });
    this.showData(table2);

    this.House = new House('', 0, '', 0, 0, 0);
  }

  /* ELIMINAR */
  delete(_id: string, validate = true) {
    if (validate) {
      if (!confirm('Estas seguro de eliminar?')) return;
    }
    table2.map((data, index) => {
      if (data._id == _id) {
        table2.splice(index, 1);
      }
    });
    this.showData(table2);
  }

  /*ENCONTRAR */
  findById(form: any) {
    const house = table2.find(
      (data) => data.houseId == parseInt(this.stringById)
    );

    if (house) {
      this.showData([house]);
    } else {
      alert('Registro no encontrado');
    }
  }

  /*LISTAR*/
  findAll() {
    this.Houses = table2;
  }

  /* TRANSFERIR */
  transfer(home: House) {
    this.House = { ...home };
    this.delete(home._id, false);

    this.house2Transfered.emit(this.House);
  }
}
