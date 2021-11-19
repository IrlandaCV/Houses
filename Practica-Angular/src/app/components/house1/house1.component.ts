import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';

import { House } from '../../models/house';
import { HouseService } from '../../services/house1.service';

@Component({
  selector: 'house1',
  templateUrl: './house1.component.html',
  styleUrls: ['./house1.component.scss'],
  providers: [HouseService],
})
export class House1Component implements OnInit, OnChanges {
  @Output() transferHouse = new EventEmitter();
  @Input() newHouse!: House;

  public House: House;
  public Houses: House[];
  public stringById: string;

  constructor(private _houseService: HouseService) {
    this.House = new House('', 0, '', 0, 0, 0);
    this.Houses = [];
    this.stringById = '';

    this.showData();
  }

  ngOnChanges() {
    if (this.newHouse != undefined && this.newHouse != null) {
      this.createinTransfer(this.newHouse);
      this.showData();
    }
  }

  ngOnInit(): void {}

  showData(): void {
    this._houseService
      .getHouses()
      .subscribe(({ houses }: { houses: House[] }) => {
        this.Houses = houses;
      });
  }

  /* CREAR UNO NUEVO */

  createinTransfer(house: House) {
    this._houseService.saveHouse(house).subscribe(
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
    this._houseService.saveHouse(this.House).subscribe(
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

  /* ELIMINAR */
  delete({ houseId }: House, validate = true) {
    if (validate) {
      if (!confirm('¿Esta seguro de eliminar el registro?')) return;
    }
    this._houseService.deleteHouse(houseId).subscribe(
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
  /* TRANSFERIR */
  transfer(event: any, home: House) {
    const houseTransfered: House = { ...home };
    this.delete(home, false);
    this.transferHouse.emit(houseTransfered);
  }

  /*ENCONTRAR */
  findById(form: any) {
    this._houseService.getHouse(parseInt(this.stringById)).subscribe(
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

  /* ACTUALIZAR */
  update() {
    this._houseService.updateHouse(this.House).subscribe(
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
}
