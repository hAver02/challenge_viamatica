

export default class MongoDao {
    constructor(model){
        this.model = model;
    }

    create = async (body)=> {
        try {

            const data = await this.model.create(body)
            return data;
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
    
    getAll = async ()=> {
        try {
            return await this.model.find({});
        } catch (error) {
            throw new Error(error)
            
        }
    }

    getById = async (id)=> {
        try {
            return await this.model.findById(id)
        } catch (error) {
            throw new Error(error)
        }
    }

    update = async (id, body)=> {
        try {
            return await this.model.findByIdAndUpdate(id, body, {new : true});
        } catch (error) {
            console.log("error", error);
            
            throw new Error(error)
        }
    }

    delete = async (id)=> {
        try {
            return await this.model.findByIdAndDelete(id)
        } catch (error) {
            throw new Error(error)
            
        }
    }

}