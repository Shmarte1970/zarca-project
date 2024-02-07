const test = require('ava');

test.before(async t => {
	t.timeout(300000); // 5 minutes to connect db	
		
	process.env.NODE_ENV='test';
	t.context.modelService = require('../../services/user/authService');
	const {dbSetup} = require('../../config/dbConfig');
	await dbSetup();	

	// Extra data for tests
	t.context.tokenRefresh=null;
	t.context.userService = require('../../services/user/userService');
	await t.context.userService.createEntity({ name: "Test", surnames: "Test", email: "test@test.es", phone: "666666666", username: "test", password: "Adm1nistrad@r"});	
});

// Start tests ...
test.serial('Login', async t => {		
	const testModel = {
		"username": "test",
		"password": "Adm1nistrad@r"		
	};

	const data = await t.context.modelService.login(testModel);
	
	t.context.tokenRefresh = data.tokenRefresh;

	t.is(data.success, true);
	t.is(data.message, "Login successfully");
	t.pass();
});


test.serial('Token refresh', async t => {	
	const dataLogin = await t.context.modelService.login({ username: "test", password: "Adm1nistrad@r"	});
	const data = await t.context.modelService.tokenRefresh(dataLogin.tokenRefresh);
	
	t.is(data.success, true);
	t.is(data.message, "Token refreshed");
 	t.pass();
});