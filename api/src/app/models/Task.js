import Sequelize, { Model } from "sequelize";


class Task extends Model{
    static init(sequelize){
        super.init(
            {   
                title_task: Sequelize.STRING,
                task: Sequelize.STRING,
                check: Sequelize.BOOLEAN
            },{
                sequelize
            }
        )
        return this;
    }
    static associate(models){
        this.belongsTo(models.Users, {foreignKey: 'user_id', as: 'user'})
    }

}

export default Task;