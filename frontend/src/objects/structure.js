class Structure{


    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.type = data.type;
        this.uValue = data.uValue;
        this.manufacture = data.manufacture;
        this.area = data.area;
        this.material = data.material;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
      }



    setID(id){
        this.id=id;

    }

    setTitle(title){
        this.title = title;
    }

    setType(type){
        this.type = type;

    }

    setUValue(uValue){
        this.uValue = uValue;
    }

    setMaterial(material){
        this.material = material
    }

    setManufacture(manufacture){
        this.manufacture = manufacture;
    }

    setArea(area){
        this.area = area;

    }
        
    setCreatedAt(createdAt){
        this.createdAt = createdAt;
    }

    setUpdatedAt(updatedAt){
        this.updatedAt = updatedAt;
    }

}

