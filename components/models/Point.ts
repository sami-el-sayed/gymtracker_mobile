export default class Point {
    id?: number;
    date: Date;
    sets:number;
    reps:number;
    weight: number;
    weightLbs:number;
    status: string;

    constructor(_date: Date | string,_sets:number,_reps:number,_weight:number,_status:string, _id?:number) {
      this.sets=_sets;
      this.reps=_reps;

      this.weight=_weight;
      this.weightLbs = _weight * 2;

      this.status= _status;

      if(_id) this.id = _id;

      //If _date passed as string changes to Date type
      if(typeof _date === "string") this.date = new Date(_date);
      else this.date = _date;
    }

}
