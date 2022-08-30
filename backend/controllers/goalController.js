const asyncHandler = require('express-async-handler')

// @desc Get goals
// @route GET /api/goals
// access Private
const getGoals = asyncHandler ((req, res) => {
    res.status(200).json({message: 'Get goals'})
})

// @desc Set goals
// @route POST /api/goals
// access Private
const setGoal = asyncHandler ((req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    res.status(200).json({message: 'Set goal'})
})

// @desc Update goals
// @route PUT /api/goal/:id
// access Private
const updateGoal = asyncHandler ((req, res) => {
    res.status(200).json({message: `Update goal ${req.params.id}`})
})

// @desc Delete goals
// @route DELETE /api/goal/:id
// access Private
const deleteGoal = asyncHandler ((req, res) => {
    res.status(200).json({message: `Delete goal ${req.params.id}`})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}