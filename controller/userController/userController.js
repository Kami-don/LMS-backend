const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const canvasInstance = 'k12.instructure.com';

// const login = async (req, res) => {
//   try {
//     const response = await fetch(`https://${canvasInstance}/api/v1/users/self/enrollments`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${req.body.token}`
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     const enrollments = await response.json();
//     res.status(200).send(enrollments[0])
//   } catch (error) {
//     console.error('Failed to fetch courses:', error);
//     res.status(401).send('Unauthorized')
//   }
// }

const register = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm, role } = req.body;

    // check if password and passwordConfirm match
    if (password !== passwordConfirm) {
      return res.status(400).json({ message: "Passwords don't match." });
    }

    const user = await User.create({ name, email, password, passwordConfirm, role });
    console.log(user)
    res.status(201).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({
      status: 'success',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    });
  }
}

const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    console.log(user)

    if (!user || !(await bcrypt.compare(req.body.oldPassword, user.password))) {
      return res.status(400).json({ message: "Your old password is incorrect" });
    }

    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;
    await user.save();

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    });
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).json({ message: "No user found with that ID" });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    });
  }
}

module.exports = {
  register,
  login,
  updatePassword,
  updateUser
}
