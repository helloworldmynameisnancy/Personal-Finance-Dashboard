const incomeSchema = require("../models/incomeModel.js")

exports.addIncome = async (req, res) => {
    const {title, amount, category, date} = req.body

    const income = incomeSchema({
        title,
        amount,
        category,
        date
    })
    try {
        if(!title || !category || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    //console.log(income)
}

exports.getIncome = async(req, res) => {
    try{
        const income = await incomeSchema.find().sort({createdAt: -1})
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteIncome = async(req, res) => {
    const {id} = req.params;
    incomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}