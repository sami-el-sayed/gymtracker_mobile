import Point from "./Point"


export default class Exercise {

    id?: number
    name: string;
    points: Point[];

    constructor(_name: string,_points?:Point[],_id?:number) {
      this.name = _name;

      if(_points !== null && _points !== undefined && _points.length > 0) this.points = _points;
      else this.points = [];
      if(_id) this.id = _id;
    }

}
