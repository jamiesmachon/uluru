export interface CommonControllerInterface {
  create(req: any, body: any): any;
  getAll(req: any, body?: any): any;
  get(req: any, id: number): any;
  update(req: any, id: number, body: any): any;
  delete(req: any, id: number): any;
}
