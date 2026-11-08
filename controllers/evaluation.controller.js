const db = require("../db/knex");

exports.list = async(req,res,next) => {
    try {
        const u_id = req.params.u_id;
        const eva = await db("evauser").select("evauser.eva_id").where("evauser.u_id",u_id).first()
        const evau = await db("evauser").select("*").where("evauser.eva_id",eva.eva_id).where("evauser.evau_role","U").first()
        const list = await db("evauser")
            .leftJoin(
                "evaluation",
                "evauser.eva_id",
                "evaluation.eva_id"
            )
            .leftJoin(
                "users",
                "evauser.u_id",
                "users.u_id"
            )
            .leftJoin(
                "topic",
                "evaluation.t_id",
                "topic.t_id"
            )
            .select(
                "evaluation.eva_id",
                "evaluation.date_start",
                "evaluation.date_end",
                "evauser.evau_id",
                "topic.t_id",
                "topic.t_name",
                "users.u_id",
                "users.u_name",
            )
            .where("evauser.u_id",evau.u_id)
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

exports.create = async(req,res,next) => {
    try {
        const eva = req.body;
        const evau = req.body.evauser;
        await db.transaction(async(trx)=>{
            const [eva_id] = await trx("evaluation").insert({
                date_start: eva.date_start,
                date_end: eva.date_end,
                t_id: eva.t_id
            })
            const evaudata = evau.map((item)=>({
                ...item,
                eva_id: eva_id
            }))
            await trx("evauser").insert(evaudata)
        })
        res.status(201).json({
            success: true,
            message: "เพิ่มข้อมูลเรียบร้อย"
        })
    } catch (e) {
        next(e)
    }
}

exports.createEvar = async(req,res,next) => {
    try {
        const e_id = req.params.u_id;
        const evar = req.body;
        const evardata = evar.map((item)=>({
            ...item,
            e_id: e_id
        }))
        await db("evaluation_results").insert(evardata)
        res.status(201).json({
            success: true,
            message: "เพิ่มข้อมูลเรียบร้อย"
        })
    } catch (e) {
        next(e)
    }
}

exports.listCm = async(req,res,next) => {
    try {
        const t_id = req.params.t_id
        const u_id = req.params.u_id
        const list = await db("comment")
            .leftJoin(
                "evaluation",
                "comment.eva_id",
                "evaluation.eva_id"
            )
            .leftJoin(
                "users",
                "comment.u_cm_id",
                "users.u_id"
            )
            .leftJoin(
                "comment",
                "comment.u_cm_id",
            )
            .select("*")
            .where("comment.eva_id",eva_id)
            .where("comment.u_id",u_id)
        res.status(201).json({
            success: true,
            message: "ดึงข้อมูลเรียบร้อย",
            item: list,
            total: list.length
        })
    } catch (e) {
        next(e)
    }
}

exports.createCm = async(req,res,next) => {
    try {
        const u_cm_id = req.params.u_id
        const { u_id, t_id ,comment} = req.body;
        await db("comment").insert({ u_id, t_id ,comment, u_cm_id})
        res.status(201).json({
            success: true,
            message: "เพิ่มข้อมูลเรียบร้อย"
        })
    } catch (e) {
        next(e)
    }
}