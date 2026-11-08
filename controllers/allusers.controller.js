const db = require("../db/knex");

exports.list = async(req,res,next) => {
    try {
        const u_role = req.params.u_role;
        const list = await db("users").select("*").where("users.u_role", u_role)
        res.status(201).json({
            success: true,
            item: list,
            total: list.length
        })
    } catch (e) {
        next(e)
    }
}

exports.edit = async(req,res,next) => {
    try {
        const u_id = req.params.u_id;
        const u_role = req.params.u_role;
        const list = await db("users").select("*").where("users.u_role", u_role).where("users.u_id", u_id).first()
        res.status(201).json({
            success: true,
            item: list
        })
    } catch (e) {
        next(e)
    }
}