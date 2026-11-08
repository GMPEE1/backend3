const db = require("../db/knex");

exports.list = async(req,res,next) => {
    try {
        const u_role = req.params.u_role;
        const list = await db("users").select("*").where("users.u_role", u_role)
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
        const u_id = req.params.u_id;
        const u_role = req.params.u_role;
        const list = await db("users").select("*").where("users.u_role", u_role).where("users.u_id", u_id).first()
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
        const u_id = req.params.u_id;
        const u_role = req.params.u_role;
        const user = req.body;
        await db("users").update(user).where("users.u_role", u_role).where("users.u_id", u_id)
        res.status(201).json({
            success: true,
            message: "อัพเดทข้อมูลเรียบร้อย"
        })
    } catch (e) {
        next(e)
    }
}

exports.delete = async(req,res,next) => {
    try {
        const u_id = req.params.u_id;
        const u_role = req.params.u_role;
        await db("users").where("users.u_role", u_role).where("users.u_id", u_id).delete()
        res.status(201).json({
            success: true,
            message: "ลบข้อมูลเรียบร้อย"
        })
    } catch (e) {
        next(e)
    }
}

exports.create = async(req,res,next) => {
    try {
        const { u_name, u_email, u_role } = req.body;
        await db("users").insert({ u_name, u_email, u_role , u_password: "12345678", u_pw_status: 0 })
        res.status(201).json({
            success: true,
            message: "เพิ่มข้อมูลเรียบร้อย"
        })
    } catch (e) {
        next(e)
    }
}

exports.resetPw = async(req,res,next) => {
    try {
        const u_id = req.params.u_id;
        await db("users").update({ u_password: "12345678", u_pw_status: 0 }).where("users.u_id", u_id)
        res.status(201).json({
            success: true,
            message: "รีเซ็ตรหัสผ่านเรียบร้อย"
        })
    } catch (e) {
        next(e)
    }
}

exports.changePw = async(req,res,next) => {
    try {
        const u_id = req.params.u_id;
        const u_password = req.body.u_password;
        await db("users").update({ u_password, u_pw_status: 1 }).where("users.u_id", u_id)
        res.status(201).json({
            success: true,
            message: "เปลี่ยนรหัสผ่านเรียบร้อย"
        })
    } catch (e) {
        next(e)
    }
}