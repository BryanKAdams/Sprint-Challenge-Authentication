const db = require('../database/dbConfig')
const Users = require('./auth-model');


describe('Users Model', function() {
    describe('test environment', function() {
        it('should use the testing environment', function() {
            expect(process.env.DB_ENV).toBe('testing')
        })
    })

    describe('addUser()', function() {
        beforeEach(async () => {
            await db('users').truncate();

        })
        it('adds a new user to the database', async function() {
            await Users.addUser({username: 'Cortana', password: 'Beepboop'})
            await Users.addUser({username: 'Master Chief', password: 'John117'})
            
            const users = await db('users');
            expect(users).toHaveLength(2);
            expect(users[0].username).toBe('Cortana')
        })
    })
    describe('getUserByUsername', function() {
        beforeEach(async () => {
            await db('users').truncate();
        })
        it('gets users by specific passed in username', async function() {
            await Users.addUser({username: 'Cortana', password: 'Beepboop'})
            await Users.addUser({username: 'Master Chief', password: 'John117'})
            const testUser = await Users.getUserByUsername("Master Chief")
            expect(testUser.username).toBe('Master Chief')
            const testUser2 = await Users.getUserByUsername("Cortana")
            expect(testUser2.username).toBe("Cortana");
        })
    })
})