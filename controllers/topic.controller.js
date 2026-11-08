const db = require("../db/knex");
const path = require('path');

function relFromUploads(absPath) {
  // ให้ได้ path แบบ relative ต่อโฟลเดอร์ uploads และใช้ slash เดียว
  return path
    .relative(path.join(__dirname, '..', 'uploads'), absPath)
    .replace(/\\/g, '/');
}

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

exports.listInd = async(req,res,next) => {
    try {
        const t_id = req.params.t_id;
        const topic = await db("topic").select("*").where("topic.t_id",t_id).first()
        const list = await db("indicator").select("*").where("indicator.t_id",topic.t_id)
        res.status(201).json({
            success: true,
            message: "ดึงข้อมูลเสร็จเรียบร้อย",
            item: {topic,list},
            total: list.length
        })
    } catch (e) {
        next(e)
    }
}

exports.editInd = async(req,res,next) => {
    try {
        const t_id = req.params.t_id;
        const ind_id = req.params.ind_id;
        const topic = await db("topic").select("*").where("topic.t_id",t_id).first()
        const list = await db("indicator").select("*").where("indicator.t_id",topic.t_id).where("indicator.ind_id",ind_id)
        res.status(201).json({
            success: true,
            message: "ดึงข้อมูลเสร็จเรียบร้อย",
            item: {topic,list},
            total: list.length
        })
    } catch (e) {
        next(e)
    }
}

exports.updateInd = async(req,res,next) => {
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

exports.deleteInd = async(req,res,next) => {
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

exports.createInd = async(req,res,next) => {
    try {
        const t_id = req.params.t_id;
        const { ind_name, ind_score, score_max } = req.body;
        const score = {score_max};
        if(ind_score==1){
            score.score_step1 = score_max / 4 * 1,
            score.score_step2 = score_max / 4 * 2,
            score.score_step3 = score_max / 4 * 3
        } else {
            score.score_step1 = 0,
            score.score_step2 = 0,
            score.score_step3 = 0
        }

        const file_path = relFromUploads(req.file.path);
        if (!req.file) return res.status(400).json({ success:false, message:'ไม่ได้ส่ง file มาด้วย' });
        await db.transaction(async(trx)=>{
            const [sc_id] = await trx("score").insert(score)
            await trx("indicator").insert({ind_name, ind_score, sc_id, t_id, file_name: req.file.originalname, file_path})
        })

        res.status(201).json({
            success: true,
            message: "เพิ่มข้อมูลเรีบร้อย"
        })
    } catch (e) {
        next(e)
    }
}