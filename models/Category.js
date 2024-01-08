import db from "../config/db.js";
import { DataTypes } from "sequelize";

const Category = db.define("categories", {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    })

export default Category;