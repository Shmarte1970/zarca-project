const test = require('ava');

test.before(async t => {
	t.timeout(300000); // 5 minutes to connect db	
		
	process.env.NODE_ENV='test';
	t.context.modelService = require('../../services/user/userService');
	const {dbSetup} = require('../../config/dbConfig');
	await dbSetup();	

	// Extra data for tests
	t.context.roleService = require('../../services/user/roleService');
	await t.context.roleService.createEntity({ name: "Test"});
	await t.context.roleService.createEntity({ name: "Test 2"});
});

// Start tests ...
test.serial('Add', async t => {		
	const testModel = {
		"name": "Test",
		"surnames": "User",		
		"email": "test@user.com",		
		"phone": "666666666",
		"username": "testUsername",
		"password": "Adm1nistrad@r"		
	};

	const data = await t.context.modelService.createEntity(testModel);
	
	t.is(data.name, 'Test');
	t.pass();
});


test.serial('Get all', async t => {
	const data = await t.context.modelService.getAll([]);
	
	t.is(data.entities.length, 1);
	t.pass();
});

test.serial('Get one by id', async t => {	
	const data = await t.context.modelService.get(1);
	
	t.is(data.name, 'Test');
	t.pass();
});

test.serial('Get one by username', async t => {	
	const data = await t.context.modelService.getOneBy({ username: 'testUsername' });
	
	t.is(data.name, 'Test');
	t.pass();
});

test.serial('Update', async t => {
	const testModel = {
		"name": "Test",
		"surnames": "User Updated",
		"email": "test@user.com",
		"phone": "74736285G",
		"username": "testUsername",
		"password": "Adm1nistrad@r",
		"roleId": 1
	};

	const data = await t.context.modelService.updateEntity(1, testModel);	

	t.is(data.surnames, 'User Updated');
	t.pass();
});

test.serial('Add rol to user', async t => {	
	const data = await t.context.modelService.addRole(1, 1);	
	
	t.is(data.roles.length, 1);
	t.is(data.roles[0].name, "Test");
	t.pass();
});

test.serial('Remove rol to user', async t => {	
	const data = await t.context.modelService.removeRole(1, 1);	
	
	t.is(data.roles.length, 0);	
	t.pass();
});

test.serial('Set roles to user', async t => {	
	const data = await t.context.modelService.setRoles(1, [{"id": 1}, {"id": 2}]);
	
	t.is(data.roles.length, 2);	
	t.pass();
});

test.serial('Disable', async t => {	
	const dataDelete = await t.context.modelService.disable(1);	
	const data = await t.context.modelService.get(1);
	
	t.false(data.enabled);	
	t.truthy(data.disabledAt);
	t.pass();
});

test.serial('Enable', async t => {	
	const dataDelete = await t.context.modelService.enable(1);	
	const data = await t.context.modelService.get(1);
	
	t.true(data.enabled);
	t.is(data.disabledAt, null);
	t.pass();
});

test.serial('Delete', async t => {	
	const dataDelete = await t.context.modelService.deleteEntity(1);	
	const data = await t.context.modelService.getAll([]);
	
	t.is(data.entities.length, 0);	
	t.pass();
});