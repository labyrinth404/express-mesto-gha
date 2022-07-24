const router = require('express').Router() ;
const {getUser, createUser, getUsers, updateUser, updateUserAvatar} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;