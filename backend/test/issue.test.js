const Issue=require('../models/Issue');
const {
    getAllIssueInfo,
    getOneIssueInfo,
    createNewIssue,
    updateIssueData,
    deleteIssueById
} =require('../controllers/issueController');

//mock request data
const request={
    body:{
        title:"mock title",
        description: "mock description"
    }
}
const response={
    status: jest.fn(x=>response),
    json: jest.fn(x=>x)
}
//check if create issue return correct status if issue is created
it('should ', async () => {
    
});