// 1. Atualizar o status de uma tarefa para "Concluído".

// db.Lista.update(
//     { "tarefas.status": "Pendente" },
//     { $set: { "tarefas.$.status": "Concluído" } },
//     { multi: true }
// )


// 2. Adicionar um novo membro à tarefa com título "Projeto de Design".
// db.Lista.update(
//     { "tarefas.titulo": "Projeto de Design" },
//     { $push: { "tarefas.$.membros": { primeiro_nome: "Emily", email: "emily@example.com" } } }
// )

// 3. Alterar a data de início da tarefa com título "Reunião de Equipe".
// db.Lista.update(
//     { "tarefas.titulo": "Reunião de Equipe" },
//     { $set: { "tarefas.$.data_inicio": new Date("2023-11-01T11:00:00Z") } }
// )

// 4. Atualizar a prioridade de uma tarefa de 1 para 3.
// db.Lista.update(
//     { "tarefas.prioridade": 1 },
//     { $set: { "tarefas.$.prioridade": 3 } },
//     { multi: true }
// )


// 5. Remover um membro específico da tarefa com título "Revisão de Documentação".
db.Lista.update(
    { "tarefas.titulo": "Revisão de Documentação" },
    { $pull: { "tarefas.$.membros": { email: "jack@example.com" } } }
)

//db.Lista.find({})