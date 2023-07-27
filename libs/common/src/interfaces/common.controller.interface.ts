export interface CommonControllerInterface {
  getAll(req: any, body?: any): any;
  get(req: any, id: number): any;
  create(req: any, body: any): any;
  update(req: any, id: number, body: any): any;
  delete(req: any, id: number): any;
}
