export default class SaveModel<T> {
   constructor(public entity: T, public date = new Date()) {}
}
