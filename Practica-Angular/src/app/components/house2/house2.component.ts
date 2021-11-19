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

import { HouseService2 } from '../../services/house2.service';

@Component({
  selector: 'house2',
  templateUrl: './house2.component.html',
  styleUrls: ['./house2.component.scss'],
  providers: [HouseService2],
})
export class House2Component implements OnInit, OnChanges {
  @Output() house2Transfered = new EventEmitter();
  @Input() newHouse!: House;

  public House: House;
  public Houses: House[];
  public stringById: string;

  constructor(private _houseService: HouseService2) {
    this.House = new House('', 0, '', 0, 0, 0);
    this.Houses = table2;
    this.stringById = '';

    this.showData();
  }

  ngOnChanges() {
    if (this.newHouse != null && this.newHouse != undefined) {
     this.createinTransfer(this.newHouse)
      this.showData();
    }
  }

  ngOnInit(): void {}

  showData(): void {
    this._houseService
      .getHouses2()
      .subscribe(({ houses2 }: { houses2: House[] }) => {
        this.Houses = houses2;
      });
  }

  /* CREAR UNO NUEVO */

  createinTransfer(house: House) {
    this._houseService.saveHouse2(house).subscribe(
      (response) => {
        if (response) {
          this.showData();
        } else {
          alert('Error al guardar');
        }
      },
      (error) => {
        console.log(<any>error);
        alert('Campos invalidos');
      }
    );
  }

  create(form: any) {
    this._houseService.saveHouse2(this.House).subscribe(
      (response) => {
        if (response) {
          this.showData();
          form.reset();
        } else {
          alert('Error al guardar');
        }
      },
      (error) => {
        console.log(<any>error);
        alert('Campos invalidos');
      }
    );
  }

  /* EDITAR */
  get(home: House) {
    this.House = { ...home };
  }

  /* ACTUALIZAR */
  update() {
    this._houseService.updateHouse2(this.House).subscribe(
      (response) => {
        this.House = new House('', 0, '', 0, 0, 0);
        this.showData();
      },
      (err) => {
        console.log(err);
        alert('Error al actualizar el registro');
      }
    );
  }

  /* ELIMINAR */
  delete({houseId}:House, validate = true) {
    if (validate) {
      if (!confirm('Estas seguro de eliminar?')) return;
    }

    this._houseService.deleteHouse2(houseId).subscribe(
      (response) => {
        this.showData();
      },
      (err) => {
        console.log(err);
        alert('Error al eliminar el registro');
      }
    );

    this.showData();
  }
    
 
  /*ENCONTRAR */
  findById(form: any) {
    this._houseService.getHouse2(parseInt(this.stringById)).subscribe(
      (response: House) => {
        this.Houses.splice(0, this.Houses.length);
        this.Houses.push(response);
      },
      (err) => {
        console.log(err);
        alert('Error al encontrar la casa');
      }
    );
  }


  /*LISTAR*/
  findAll() {
    this.showData();
  }

  /* TRANSFERIR */
  transfer(event: any, home: House) {
    const house2Transfered: House = { ...home };
    this.delete(home, false);
    this.house2Transfered.emit(house2Transfered);
  }
}
