const mongoose = require('mongoose');
const axios = require('axios')

const canvasInstance = 'k12.instructure.com';
// const accessToken = '6936~5ImUFdFYh3oKhC0QYY60w8t8xnO8JQUh5aXg6jmaVBFWKLMBEeu7moq9h1LSxl5H';
// const accessToken = '6936~qSFOAGSTIS65FuZtfw5q9OT88CIcauImi1NMifOjtJagUklzXhBBcQjLA7fXRSN5';
// const apiUrl = `https://${canvasInstance}/api/v1/courses?per_page=9`;
const Course = mongoose.model('courses', new mongoose.Schema({}), 'courses');
const Module = mongoose.model('modules', new mongoose.Schema({}), 'modules');
const ModuleItem = mongoose.model('moduleItems', new mongoose.Schema({}), 'modules');
const getCourses = async (req, res) => {
    try {
        const coursesWithAssignments = await Course.aggregate([
            {
                $lookup: {
                    from: 'assignments',
                    localField: 'canvasCourseId',
                    foreignField: 'courseId',
                    as: 'assignments'
                }
            }
        ]);

        res.send(coursesWithAssignments);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error while retrieving courses and assignments');
    }
};

async function getAllCourses(url, token) {
}


const getProgressById = async (courseId, token) => {
}

const getLecture = async (req, res) => {
    const url = `https://k12.instructure.com/api/v1/courses/${req.query.info.course_id}/pages/${req.query.info.page_url}`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer 6936~qSFOAGSTIS65FuZtfw5q9OT88CIcauImi1NMifOjtJagUklzXhBBcQjLA7fXRSN5`,
            'content-type': 'application/json'
        },
    };

    try {
        const response = await fetch(url, options);
        const rlt = await response.json();
        res.send(rlt);
    } catch (error) {
        console.error('Failed to retrieve assignments:', error);
    }
}

async function fetchModules(courseId, token) {
}

const getContentById = async (req, res) => {
    const result = await Module.aggregate([
        { $match: { courseId: parseInt(req.query.canvasCourseId, 10) } },
        {
            $lookup: {
                from: 'moduleitems', // Name of the collection in MongoDB, typically lowercase plural form
                localField: 'canvasModuleId', // Field from the modules collection
                foreignField: 'canvasModuleId', // Corresponding field from the moduleItems collection
                as: 'lessons' // Output alias
            }
        }
    ]);

    res.status(200).send(result)
};




const getTotal = async (req, res) => {

}

async function getTotalCount(url, token, allCourses = []) {
}



module.exports = {
    getCourses,
    getContentById,
    getTotal,
    getLecture

}
