// mongoDB-Compass shell 사용

// 현재 사용중인 DB 확인
// db

// study DB로 변경
// use study

// collections 에 data 넣기 (Create)
// db.users.insertOne({name : "one", email: "one@gmail.com"})
//// users : collections 이름

// collections 에 data 전체 조회 (Read)
// db.users.find()

// collections 에 data 수정 (Update)
// db.users.updateOne({_id: ObjectId("63f1c1497c04ee62fd5432f1")}, {$set: {name: "hello"}})
//// {_id: ObjectId("63f1c1497c04ee62fd5432f1")} : 자동으로 생성되는 id 값

// collections 에 data 삭제 (Delete)
// db.users.deleteOne({_id: ObjectId("63f1c1017c04ee62fd5432f0")})
