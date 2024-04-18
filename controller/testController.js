const mongoose = require('mongoose');
const axios = require('axios');

const courseSchema = new mongoose.Schema({}, { strict: false });
const assignmentSchema = new mongoose.Schema({}, { strict: false });
const moduleSchema = new mongoose.Schema({}, { strict: false });
const moduleItemSchema = new mongoose.Schema({}, { strict: false });
const ModuleItem = mongoose.model('ModuleItem', moduleItemSchema);
const Course = mongoose.model('Course', courseSchema);
const Assignment = mongoose.model('Assignment', assignmentSchema);
// const Module = mongoose.model('Module', moduleSchema);
const Module = mongoose.model('modules');

const getLatestData = async (req, res) => {
    // try {
    //     const response = await axios.get(`https://k12.instructure.com/api/v1/courses?per_page=100&page=2`, {
    //         headers: {
    //             'Authorization': `Bearer 6936~qSFOAGSTIS65FuZtfw5q9OT88CIcauImi1NMifOjtJagUklzXhBBcQjLA7fXRSN5`
    //         }
    //     });

    //     if (response.data && response.data.length > 0) {
    //         for (let courseData of response.data) {
    //             courseData.canvasCourseId = courseData.id;
    //             const course = new Course(courseData);
    //             await course.save();

    //             const assignmentResponse = await axios.get(`https://k12.instructure.com/api/v1/courses/${courseData.id}/assignments`, {
    //                 headers: {
    //                     'Authorization': `Bearer 6936~qSFOAGSTIS65FuZtfw5q9OT88CIcauImi1NMifOjtJagUklzXhBBcQjLA7fXRSN5`
    //                 }
    //             });

    //             if (assignmentResponse.data && assignmentResponse.data.length > 0) {
    //                 for (let assignmentData of assignmentResponse.data) {
    //                     assignmentData.courseId = courseData.id;  // Link the assignment to the course in MongoDB
    //                     const assignment = new Assignment(assignmentData);
    //                     await assignment.save();
    //                 }
    //             }
    //         }
    //         res.send('All course data imported successfully!');
    //     } else {
    //         res.send('No course data to import.');
    //     }
    // } catch (err) {
    //     console.log(err);
    //     res.send('Failed to import course data.');
    // }



    // try {
    //     const response = await axios.get(`https://k12.instructure.com/api/v1/courses?per_page=100&page=2`, {
    //         headers: {
    //             'Authorization': `Bearer 6936~qSFOAGSTIS65FuZtfw5q9OT88CIcauImi1NMifOjtJagUklzXhBBcQjLA7fXRSN5`
    //         }
    //     });

    //     if (response.data && response.data.length > 0) {
    //         for (let courseData of response.data) {
    //             courseData.canvasCourseId = courseData.id;

    //             const moduleResponse = await axios.get(`https://k12.instructure.com/api/v1/courses/${courseData.id}/modules`, {
    //                 headers: {
    //                     'Authorization': `Bearer 6936~qSFOAGSTIS65FuZtfw5q9OT88CIcauImi1NMifOjtJagUklzXhBBcQjLA7fXRSN5`
    //                 }
    //             });

    //             if (moduleResponse.data && moduleResponse.data.length > 0) {
    //                 for (let moduleData of moduleResponse.data) {
    //                     moduleData.courseId = courseData.id;
    //                     moduleData.canvasModuleId = moduleData.id
    //                     const module = new Module(moduleData);
    //                     await module.save();
    //                 }
    //             }
    //         }
    //         res.send('All course data imported successfully!');
    //     } else {
    //         res.send('No course data to import.');
    //     }
    // } catch (err) {
    //     console.log(err);
    //     res.send('Failed to import course data.');
    // }


    // Module.find().then(async modules => {
    //     for (var i = 0; i < modules.length; i++) {
    //         const items = await fetchModuleItems(modules[i]._doc.courseId, modules[i]._doc.canvasModuleId);
    //     }
    // })
};

const fetchModuleItems = async (courseId, moduleId) => {
    await axios.get(`https://k12.instructure.com/api/v1/courses/${courseId}/modules/${moduleId}/items`, {
        headers: {
            'Authorization': `Bearer 6936~qSFOAGSTIS65FuZtfw5q9OT88CIcauImi1NMifOjtJagUklzXhBBcQjLA7fXRSN5`
        }
    }).then(async rlt => {
        if (rlt.data && rlt.data.length > 0) {
            for (let moduleData of rlt.data) {
                moduleData.courseId = courseId;
                moduleData.canvasModuleId = moduleId
                moduleData.canvasModuleItemId = moduleData.id
                // console.log(moduleData)
                const module = new ModuleItem(moduleData);
                await module.save().catch((error) => console.error('Error saving data:', error));;
            }

            res.send("success")
        }
    })
}

module.exports = {
    getLatestData
}
