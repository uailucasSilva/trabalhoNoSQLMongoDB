use('gerenciadorDeTarefas');

// 1. Buscar todas as tarefas com status "Pendente":

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
])

// 2. Buscar todas as tarefas com prioridade igual a 2

db.Lista.aggregate([
    {
        $unwind: "$tarefas"
    },
    {
        $match: {
            "tarefas.prioridade": 2
        }
    },
    {
        $group: {
            _id: "$_id",
            tarefas: { $push: "$tarefas" }
        }
    }
])

// 3. Buscar todas as tarefas atribuídas a "Alice"

db.Lista.aggregate([
    {
        $unwind: "$tarefas"
    },
    {
        $match: {
            "tarefas.membros.email": "alice@example.com"
        }
    },
    {
        $group: {
            _id: "$_id",
            tarefas: { $push: "$tarefas" }
        }
    }
])

// 4. Buscar todas as tarefas com data de início em outubro de 2023

db.Lista.aggregate([
    {
        $unwind: "$tarefas"
    },
    {
        $match: {
            "tarefas.data_inicio": {
                $gte: new Date("2023-10-01T00:00:00Z"),
                $lt: new Date("2023-11-01T00:00:00Z")
            }
        }
    },
    {
        $group: {
            _id: "$_id",
            tarefas: { $push: "$tarefas" }
        }
    }
])

//5.  Buscar todas as tarefas com status "Em Andamento" e prioridade 1
db.Lista.aggregate([
    {
        $unwind: "$tarefas"
    },
    {
        $match: {
            "tarefas.status": "Em Andamento",
            "tarefas.prioridade": 1
        }
    },
    {
        $group: {
            _id: "$_id",
            tarefas: { $push: "$tarefas" }
        }
    }
])

// 6. Buscar todas as tarefas concluídas (status "Concluído")
db.Lista.aggregate([
    {
        $unwind: "$tarefas"
    },
    {
        $match: {
            "tarefas.status": "Concluído"
        }
    },
    {
        $group: {
            _id: "$_id",
            tarefas: { $push: "$tarefas" }
        }
    }
])

// 7.  Buscar todas as tarefas com prioridade 3 atribuídas a "Eve"
db.Lista.aggregate([
    {
        $unwind: "$tarefas"
    },
    {
        $match: {
            "tarefas.prioridade": 3,
            "tarefas.membros.email": "eve@example.com"
        }
    },
    {
        $group: {
            _id: "$_id",
            tarefas: { $push: "$tarefas" }
        }
    }
])
// 8. Buscar todas as tarefas com descrição contendo a palavra "projeto" (case-insensitive)
db.Lista.aggregate([
    {
        $unwind: "$tarefas"
    },
    {
        $match: {
            "tarefas.descricao": { $regex: /projeto/i }
        }
    },
    {
        $group: {
            _id: "$_id",
            tarefas: { $push: "$tarefas" }
        }
    }
])


// 9. Buscar todas as tarefas com data de início em janeiro de 2024
db.Lista.aggregate([
    {
        $unwind: "$tarefas"
    },
    {
        $match: {
            "tarefas.data_inicio": {
                $gte: new Date("2024-01-01T00:00:00Z"),
                $lt: new Date("2024-02-01T00:00:00Z")
            }
        }
    },
    {
        $group: {
            _id: "$_id",
            tarefas: { $push: "$tarefas" }
        }
    }
])


// 10. Buscar todas as tarefas com prioridade 2 ou 3 que estão pendentes
db.Lista.aggregate([
    {
        $unwind: "$tarefas"
    },
    {
        $match: {
            $and: [
                {
                    "tarefas.prioridade": { $in: [2, 3] }
                },
                {
                    "tarefas.status": "Pendente"
                }
            ]
        }
    },
    {
        $group: {
            _id: "$_id",
            tarefas: { $push: "$tarefas" }
        }
    }
])

// 11. Buscar tarefas atrasadas (com data de início anterior à data atual) e com prioridade maior ou igual a 2.
db.Lista.aggregate([
    {
        $unwind: "$tarefas"
    },
    {
        $match: {
            $and: [
                {
                    "tarefas.data_inicio": { $lt: new Date() }
                },
                {
                    "tarefas.prioridade": { $gte: 2 }
                }
            ]
        }
    },
    {
        $group: {
            _id: "$_id",
            tarefas: { $push: "$tarefas" }
        }
    }
])


// 12. Buscar tarefas em andamento (status "Em Andamento") com prioridade 1 ou 2.
db.Lista.aggregate([
    {
        $unwind: "$tarefas"
    },
    {
        $match: {
            $and: [
                {
                    "tarefas.status": "Em Andamento"
                },
                {
                    "tarefas.prioridade": { $in: [1, 2] }
                }
            ]
        }
    },
    {
        $group: {
            _id: "$_id",
            tarefas: { $push: "$tarefas" }
        }
    }
])


// 13. Buscar tarefas atribuídas a mais de um membro.
db.Lista.aggregate([
    {
        $unwind: "$tarefas"
    },
    {
        $match: {
            $expr: {
                $gt: [{ $size: "$tarefas.membros" }, 1]
            }
        }
    },
    {
        $group: {
            _id: "$_id",
            tarefas: { $push: "$tarefas" }
        }
    }
])


// 14. Buscar tarefas com a data de início mais próxima do presente (ordem ascendente).
db.Lista.aggregate([
    {
        $unwind: "$tarefas"
    },
    {
        $sort: {
            "tarefas.data_inicio": 1
        }
    },
    {
        $limit: 5
    },
    {
        $group: {
            _id: "$_id",
            tarefas: { $push: "$tarefas" }
        }
    }
])


// 15. Buscar tarefas com prioridade 3 e que não possuam membros (É esperado que não retorne nada, com os dados inseridos).
db.Lista.aggregate([
    {
        $unwind: "$tarefas"
    },
    {
        $match: {
            $and: [
                {
                    "tarefas.prioridade": 3
                },
                {
                    "tarefas.membros": { $exists: false }
                }
            ]
        }
    },
    {
        $group: {
            _id: "$_id",
            tarefas: { $push: "$tarefas" }
        }
    }
])

