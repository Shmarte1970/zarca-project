const test = require('ava');

test.before(async t => {
	t.timeout(300000); // 5 minutes to connect db	
		
	process.env.NODE_ENV='test';
	t.context.modelService = require('../../services/locations/countryService');
	const {dbSetup} = require('../../config/dbConfig');
	await dbSetup();
});

// Start tests ...
test.serial('Add', async t => {		
	const testModel = {
		"name": "Test"
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

test.serial('Update', async t => {
	const testModel = {
		"name": "Test updated"		
	};

	const data = await t.context.modelService.updateEntity(1, testModel);	

	t.is(data.name, 'Test updated');
	t.pass();
});

test.serial('Delete', async t => {	
	const dataDelete = await t.context.modelService.deleteEntity(1);	
	const data = await t.context.modelService.getAll([]);
	
	t.is(data.entities.length, 0);	
	t.pass();
});