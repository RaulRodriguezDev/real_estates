import db from "../config/db.js"
import { DataTypes } from "sequelize"

const Property = db.define('properties', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type:DataTypes.TEXT,
        allowNull: false
    },
    rooms: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parkings: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    wc: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

export default Property