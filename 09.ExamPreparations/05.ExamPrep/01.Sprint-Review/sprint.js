function solve(input){
    // {person: arrayOfTasks[]}
                //{id, title, status, points}
    
    const n = input.shift();

    const employees = [];

    for (let i = 0; i < n; i++) {

        const [assignee, taskId, title, status, estimatedPoints] = input.shift().split(":");

        let newEmployee = employees.find(e => e.hasOwnProperty(`${assignee}`));

        const newTask = {
            taskId,
            title,
            status,
            estimatedPoints,
        }

        if (!newEmployee) {
            
            newEmployee = {};
            newEmployee[`${assignee}`] = [];
            employees.push(newEmployee);
        }       
        // should fuckig work but this is JS so probably wont and will just add new person
        newEmployee[`${assignee}`].push(newTask);
    }
    

    while (input.length > 0) {
        const cmd = input.shift().split(":");

        const command = cmd[0];
        const assigneeName = cmd[1];
        const currAssignee = employees.find(e => e.hasOwnProperty(`${assigneeName}`));

        if (command === "Add New") {

            if (!currAssignee) {
                console.log(`Assignee ${assigneeName} does not exist on the board!`);
                continue;
            }

            const taskToAdd = {
                taskId: cmd[2],
                title: cmd[3],
                status: cmd[4],
                estimatedPoints: cmd[5],
            }
            currAssignee[`${assigneeName}`].push(taskToAdd);
        }
        else if (command === "Change Status") {
            if (!currAssignee) {
                console.log(`Assignee ${assigneeName} does not exist on the board!`);
                continue;
            }
            const taskToUpdateId = cmd[2];
            const newStatus = cmd[3];
            const currAssigneeTaskId = currAssignee[`${assigneeName}`].find(t => t.taskId === taskToUpdateId);
            
            if (!currAssigneeTaskId) {
                console.log(`Task with ID ${taskToUpdateId} does not exist for ${assigneeName}!`);
                continue;
            }

            currAssigneeTaskId.status = newStatus;
        }
        else if (command === "Remove Task") {
            if (!currAssignee) {
                console.log(`Assignee ${assigneeName} does not exist on the board!`);
                continue;
            }

            const taskToRemoveIndex = cmd[2];

            if (taskToRemoveIndex < 0 || taskToRemoveIndex >= currAssignee[`${assigneeName}`].length) {
                console.log("Index is out of range!");
                continue;
            }

            currAssignee[`${assigneeName}`].splice(taskToRemoveIndex, 1);
        }
    }

    let totalToDoPoints = 0;
    let totalInProgressPoints = 0;
    let totalCodeReviewPoints = 0;
    let totalDonePoints = 0;

    for (const employee of Object.values(employees)) {
        
        for (const tasks of Object.values(employee)) {
            
            for (const task of Object.values(tasks)) {
                if (task.status === "ToDo") {
                    totalToDoPoints += Number(task.estimatedPoints);
                }
                else if (task.status === "In Progress") {
                    totalInProgressPoints += Number(task.estimatedPoints);
                }
                else if (task.status === "Code Review") {
                    totalCodeReviewPoints += Number(task.estimatedPoints);
                }
                else if (task.status === "Done") {
                    totalDonePoints += Number(task.estimatedPoints);
                }
            }          
        }
    }
    console.log(`ToDo: ${totalToDoPoints}pts`);
    console.log(`In Progress: ${totalInProgressPoints}pts`);
    console.log(`Code Review: ${totalCodeReviewPoints}pts`);
    console.log(`Done Points: ${totalDonePoints}pts`);

    const sumRest = Number(totalToDoPoints) + Number(totalInProgressPoints) + Number(totalCodeReviewPoints);
    if (totalDonePoints >= sumRest) {
        console.log("Sprint was successful!");
    }
    else{
        console.log("Sprint was unsuccessful...");
    }
}

solve([
    '5',
    'Kiril:BOP-1209:Fix Minor Bug:ToDo:3',
    'Mariya:BOP-1210:Fix Major Bug:In Progress:3',
    'Peter:BOP-1211:POC:Code Review:5',
    'Georgi:BOP-1212:Investigation Task:Done:2',
    'Mariya:BOP-1213:New Account Page:In Progress:13',
    'Add New:Kiril:BOP-1217:Add Info Page:In Progress:5',
    'Change Status:Peter:BOP-1290:ToDo',
    'Remove Task:Mariya:1',
    'Remove Task:Joro:1',
]);
console.log("-----------------------------------------------------------------------");
solve([
    '4',
    'Kiril:BOP-1213:Fix Typo:Done:1',
    'Peter:BOP-1214:New Products Page:In Progress:2',
    'Mariya:BOP-1215:Setup Routing:ToDo:8',
    'Georgi:BOP-1216:Add Business Card:Code Review:3',
    'Add New:Sam:BOP-1237:Testing Home Page:Done:3',
    'Change Status:Georgi:BOP-1216:Done',
    'Change Status:Will:BOP-1212:In Progress',
    'Remove Task:Georgi:3',
    'Change Status:Mariya:BOP-1215:Done',
]);