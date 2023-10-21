**_Estatísticas Antes da Otimização_**

_Stats_

```
{
  "db": "gerenciadorDeTarefas",
  "collections": 3,
  "views": 0,
  "objects": 1,
  "avgObjSize": 10970,
  "dataSize": 10970,
  "storageSize": 28672,
  "indexes": 3,
  "indexSize": 28672,
  "totalSize": 57344,
  "scaleFactor": 1,
  "fsUsedSize": 174486646784,
  "fsTotalSize": 254721126400,
  "ok": 1
}
```

_Explain da seguinte busca:_

```
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
```

_Resultado:_

```
{
  "explainVersion": "2",
  "stages": [
    {
      "$cursor": {
        "queryPlanner": {
          "namespace": "gerenciadorDeTarefas.Lista",
          "indexFilterSet": false,
          "parsedQuery": {},
          "queryHash": "0031D48D",
          "planCacheKey": "FB123EF8",
          "maxIndexedOrSolutionsReached": false,
          "maxIndexedAndSolutionsReached": false,
          "maxScansToExplodeReached": false,
          "winningPlan": {
            "queryPlan": {
              "stage": "PROJECTION_SIMPLE",
              "planNodeId": 2,
              "transformBy": {
                "_id": true,
                "tarefas": true
              },
              "inputStage": {
                "stage": "COLLSCAN",
                "planNodeId": 1,
                "filter": {},
                "direction": "forward"
              }
            },
            "slotBasedPlan": {
              "slots": "$$RESULT=s6 env: { s2 = Nothing (SEARCH_META), s1 = TimeZoneDatabase(Asia/Bahrain...Pacific/Fiji) (timeZoneDB), s3 = 1697849638360 (NOW) }",
              "stages": "[2] mkbson s6 s4 [_id, tarefas] keep [] true false \n[1] scan s4 s5 none none none none lowPriority [] @\"1eb118ac-634f-462a-92ae-25c14bfa74c9\" true false "
            }
          },
          "rejectedPlans": []
        },
        "executionStats": {
          "executionSuccess": true,
          "nReturned": 1,
          "executionTimeMillis": 2,
          "totalKeysExamined": 0,
          "totalDocsExamined": 1,
          "executionStages": {
            "stage": "mkbson",
            "planNodeId": 2,
            "nReturned": 1,
            "executionTimeMillisEstimate": 0,
            "opens": 1,
            "closes": 1,
            "saveState": 1,
            "restoreState": 1,
            "isEOF": 1,
            "objSlot": 6,
            "rootSlot": 4,
            "fieldBehavior": "keep",
            "fields": [
              "_id",
              "tarefas"
            ],
            "projectFields": [],
            "projectSlots": [],
            "forceNewObject": true,
            "returnOldObject": false,
            "inputStage": {
              "stage": "scan",
              "planNodeId": 1,
              "nReturned": 1,
              "executionTimeMillisEstimate": 0,
              "opens": 1,
              "closes": 1,
              "saveState": 1,
              "restoreState": 1,
              "isEOF": 1,
              "numReads": 1,
              "recordSlot": 4,
              "recordIdSlot": 5,
              "fields": [],
              "outputSlots": []
            }
          }
        }
      },
      "nReturned": 1,
      "executionTimeMillisEstimate": 0
    },
    {
      "$unwind": {
        "path": "$tarefas"
      },
      "nReturned": 36,
      "executionTimeMillisEstimate": 0
    },
    {
      "$match": {
        "tarefas.status": {
          "$eq": "Pendente"
        }
      },
      "nReturned": 20,
      "executionTimeMillisEstimate": 0
    },
    {
      "$group": {
        "_id": "$_id",
        "tarefas": {
          "$push": "$tarefas"
        }
      },
      "maxAccumulatorMemoryUsageBytes": {
        "tarefas": 8649
      },
      "totalOutputDataSizeBytes": 8870,
      "usedDisk": false,
      "spills": 0,
      "spilledDataStorageSize": 0,
      "numBytesSpilledEstimate": 0,
      "spilledRecords": 0,
      "nReturned": 1,
      "executionTimeMillisEstimate": 0
    }
  ],
  "serverInfo": {
    "host": "LAPTOP-K8MMMI00",
    "port": 27017,
    "version": "7.0.0",
    "gitVersion": "37d84072b5c5b9fd723db5fa133fb202ad2317f1"
  },
  "serverParameters": {
    "internalQueryFacetBufferSizeBytes": 104857600,
    "internalQueryFacetMaxOutputDocSizeBytes": 104857600,
    "internalLookupStageIntermediateDocumentMaxSizeBytes": 104857600,
    "internalDocumentSourceGroupMaxMemoryBytes": 104857600,
    "internalQueryMaxBlockingSortMemoryUsageBytes": 104857600,
    "internalQueryProhibitBlockingMergeOnMongoS": 0,
    "internalQueryMaxAddToSetBytes": 104857600,
    "internalDocumentSourceSetWindowFieldsMaxMemoryBytes": 104857600,
    "internalQueryFrameworkControl": "trySbeEngine"
  },
  "command": {
    "aggregate": "Lista",
    "pipeline": [
      {
        "$unwind": "$tarefas"
      },
      {
        "$match": {
          "tarefas.status": "Pendente"
        }
      },
      {
        "$group": {
          "_id": "$_id",
          "tarefas": {
            "$push": "$tarefas"
          }
        }
      }
    ],
    "cursor": {},
    "$db": "gerenciadorDeTarefas"
  },
  "ok": 1
}
```

**_Estatísticas Depois da Otimização_**

_Stats_

```
{
  "db": "gerenciadorDeTarefas",
  "collections": 3,
  "views": 0,
  "objects": 1,
  "avgObjSize": 10970,
  "dataSize": 10970,
  "storageSize": 28672,
  "indexes": 4,
  "indexSize": 49152,
  "totalSize": 77824,
  "scaleFactor": 1,
  "fsUsedSize": 174549323776,
  "fsTotalSize": 254721126400,
  "ok": 1
}
```

_Explain da seguinte busca:_

```
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
```

_Resultados:_

```
{
  "explainVersion": "2",
  "stages": [
    {
      "$cursor": {
        "queryPlanner": {
          "namespace": "gerenciadorDeTarefas.Lista",
          "indexFilterSet": false,
          "parsedQuery": {},
          "queryHash": "0031D48D",
          "planCacheKey": "E9FDC7A8",
          "maxIndexedOrSolutionsReached": false,
          "maxIndexedAndSolutionsReached": false,
          "maxScansToExplodeReached": false,
          "winningPlan": {
            "queryPlan": {
              "stage": "PROJECTION_SIMPLE",
              "planNodeId": 2,
              "transformBy": {
                "_id": true,
                "tarefas": true
              },
              "inputStage": {
                "stage": "COLLSCAN",
                "planNodeId": 1,
                "filter": {},
                "direction": "forward"
              }
            },
            "slotBasedPlan": {
              "slots": "$$RESULT=s6 env: { s2 = Nothing (SEARCH_META), s1 = TimeZoneDatabase(Asia/Bahrain...Pacific/Fiji) (timeZoneDB), s3 = 1697850298955 (NOW) }",
              "stages": "[2] mkbson s6 s4 [_id, tarefas] keep [] true false \n[1] scan s4 s5 none none none none lowPriority [] @\"1eb118ac-634f-462a-92ae-25c14bfa74c9\" true false "
            }
          },
          "rejectedPlans": []
        },
        "executionStats": {
          "executionSuccess": true,
          "nReturned": 1,
          "executionTimeMillis": 0,
          "totalKeysExamined": 0,
          "totalDocsExamined": 1,
          "executionStages": {
            "stage": "mkbson",
            "planNodeId": 2,
            "nReturned": 1,
            "executionTimeMillisEstimate": 0,
            "opens": 1,
            "closes": 1,
            "saveState": 1,
            "restoreState": 1,
            "isEOF": 1,
            "objSlot": 6,
            "rootSlot": 4,
            "fieldBehavior": "keep",
            "fields": [
              "_id",
              "tarefas"
            ],
            "projectFields": [],
            "projectSlots": [],
            "forceNewObject": true,
            "returnOldObject": false,
            "inputStage": {
              "stage": "scan",
              "planNodeId": 1,
              "nReturned": 1,
              "executionTimeMillisEstimate": 0,
              "opens": 1,
              "closes": 1,
              "saveState": 1,
              "restoreState": 1,
              "isEOF": 1,
              "numReads": 1,
              "recordSlot": 4,
              "recordIdSlot": 5,
              "fields": [],
              "outputSlots": []
            }
          }
        }
      },
      "nReturned": 1,
      "executionTimeMillisEstimate": 0
    },
    {
      "$unwind": {
        "path": "$tarefas"
      },
      "nReturned": 36,
      "executionTimeMillisEstimate": 0
    },
    {
      "$match": {
        "tarefas.status": {
          "$eq": "Pendente"
        }
      },
      "nReturned": 20,
      "executionTimeMillisEstimate": 0
    },
    {
      "$group": {
        "_id": "$_id",
        "tarefas": {
          "$push": "$tarefas"
        }
      },
      "maxAccumulatorMemoryUsageBytes": {
        "tarefas": 8649
      },
      "totalOutputDataSizeBytes": 8870,
      "usedDisk": false,
      "spills": 0,
      "spilledDataStorageSize": 0,
      "numBytesSpilledEstimate": 0,
      "spilledRecords": 0,
      "nReturned": 1,
      "executionTimeMillisEstimate": 0
    }
  ],
  "serverInfo": {
    "host": "LAPTOP-K8MMMI00",
    "port": 27017,
    "version": "7.0.0",
    "gitVersion": "37d84072b5c5b9fd723db5fa133fb202ad2317f1"
  },
  "serverParameters": {
    "internalQueryFacetBufferSizeBytes": 104857600,
    "internalQueryFacetMaxOutputDocSizeBytes": 104857600,
    "internalLookupStageIntermediateDocumentMaxSizeBytes": 104857600,
    "internalDocumentSourceGroupMaxMemoryBytes": 104857600,
    "internalQueryMaxBlockingSortMemoryUsageBytes": 104857600,
    "internalQueryProhibitBlockingMergeOnMongoS": 0,
    "internalQueryMaxAddToSetBytes": 104857600,
    "internalDocumentSourceSetWindowFieldsMaxMemoryBytes": 104857600,
    "internalQueryFrameworkControl": "trySbeEngine"
  },
  "command": {
    "aggregate": "Lista",
    "pipeline": [
      {
        "$unwind": "$tarefas"
      },
      {
        "$match": {
          "tarefas.status": "Pendente"
        }
      },
      {
        "$group": {
          "_id": "$_id",
          "tarefas": {
            "$push": "$tarefas"
          }
        }
      }
    ],
    "cursor": {},
    "$db": "gerenciadorDeTarefas"
  },
  "ok": 1
}
```
