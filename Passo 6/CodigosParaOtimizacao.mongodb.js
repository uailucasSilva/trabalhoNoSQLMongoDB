use('gerenciadorDeTarefas')
db.stats()

db.Lista.aggregate([
    {
        $unwind: "$tarefas"
    },
    {
        $match: {
            "tarefas.status": "Pendente"
        }
    },
    {
        $group: {
            _id: "$_id",
            tarefas: { $push: "$tarefas" }
        }
    }
]).explain("executionStats");

// Criando o indice
// db.Lista.createIndex({ "tarefas.status": 1 })

db.Lista.aggregate([
    {
        $unwind: "$tarefas"
    },
    {
        $match: {
            "tarefas.status": "Pendente"
        }
    },
    {
        $group: {
            _id: "$_id",
            tarefas: { $push: "$tarefas" }
        }
    }
]).explain("executionStats");




