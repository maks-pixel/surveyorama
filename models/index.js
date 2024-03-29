const User = require("./user");
const Survey = require("./survey");
const Question = require("./question");

//create one to many relationship between survey and user
Survey.belongsTo(User,{
    foreignKey: "userID",
    onDelete: "CASCADE"
});

User.hasMany(Survey, {
    foreignKey: 'userID'
});

//create one to many relationship between question and survey
Question.belongsTo(Survey,{
    foreignKey: "surveyID",
    onDelete: 'SET NULL'
});

Survey.hasMany(Question,{
    foreignKey: "surveyID"
});

module.exports = { User, Survey, Question }