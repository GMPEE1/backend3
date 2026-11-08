const db = require("../db/knex");

exports.list = async(req,res,next) => {
    try {
        const list = await db("topic").select("*")
        res.status(201).json({
            success: true,
            message: "ดึงข้อมูลเสร็จเรียบร้อย",
            item: list,
            total: list.length
        })
    } catch (e) {
        next(e)
    }
}

exports.edit = async(req,res,next) => {
    try {
        const t_id = req.params.t_id;
        const list = await db("topic").select("*").where("topic.t_id", t_id).first()
        res.status(201).json({
            success: true,
            message: "ดึงข้อมูลเสร็จเรียบร้อย",
            item: list
        })
    } catch (e) {
        next(e)
    }
}

exports.update = async(req,res,next) => {
    try {
        const t_id = req.params.t_id;
        const t_name = req.body;
        await db("topic").update(t_name).where("topic.t_id", t_id)
        res.status(201).json({
            success: true,
            message: "อัพเดทข้อมูลเรีบร้อย"
        })
    } catch (e) {
        next(e)
    }
}

exports.delete = async(req,res,next) => {
    try {
        const t_id = req.params.t_id;
        await db("topic").where("topic.t_id", t_id).delete()
        res.status(201).json({
            success: true,
            message: "ลบข้อมูลเรีบร้อย"
        })
    } catch (e) {
        next(e)
    }
}

exports.create = async(req,res,next) => {
    try {
        const t_name = req.body;
        await db("topic").insert(t_name)
        res.status(201).json({
            success: true,
            message: "เพิ่มข้อมูลเรีบร้อย"
        })
    } catch (e) {
        next(e)
    }
}