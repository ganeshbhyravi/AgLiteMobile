aglite.Mobile.offline = {
	main: null,
	userList: [{recordId: 1, name:'system'},{recordId: 2, name:'superadmin'},{recordId: 3, name:'Suresh'},{recordId: 4, name:'Juby'},{recordId: 5, name:'Test User'},
		{recordId: 6, name:'a6'},{recordId: 7, name:'a7'},{recordId: 8, name:'a8'},{recordId: 9, name:'a9'},{recordId: 10, name:'a10'}],
	showHomePage: function() {
		var html = '<center><div class="ui-bar"><a href="javascript:aglite.Mobile.offline.getUserListFromServer()" data-transition="slide"><h3>agLite</h3></a>'
+ '<span>&nbsp;</span></div></center>';
		this.getMain().html(html).find('a').button();
		this.clearFoot();
	},
	showUserList: function(nextPage, emps) {
		var start = nextPage && nextPage.start? nextPage.start : 0;
		var limit = nextPage && nextPage.limit? nextPage.limit : 5;
		var html = '<div class="content-primary"><div data-role="collapsible" data-collapsed="false" data-theme="b" data-content-theme="d">'
		+ '<h3>User list</h3><ul data-role="listview" id="userList" data-filter="true">';
		var end = Math.min(emps.length, (start + limit));
		//var emps = emps.splice(start, end);
		for(var i=start; i<end; i++) {
			for(var key in emps[i]) {
				if (typeof key != 'function') {
					html += '<li><a data-userId="' + key + '" data-transition="slide" href="javascript:aglite.Mobile.offline.getUserDetailsromServer('+key+')">' + emps[i][key] + '</a></li>';
				}
			}
			
		}
		this.getMain().html(html).find('#userList').listview().listview('refresh');
		this.clearFoot();
		new aglite.Mobile.PagingToolbar(parseInt(emps.length, 10), parseInt(start, 10), parseInt(limit, 10), aglite.Mobile.offline.getUserListFromServer);
	},
	getUserList: function() {
		return this.userList;
	},
	getUserDetails: function(recordId) {
		var userList = this.getUserList();
		for(var i=0; i< userList.length; i++) {
			if (userList[i].recordId == recordId) {
				return userList[i];
			}
		}
		return null;
	},
	showUserDetails: function(emp) {
		var html = '<div class="content-primary"><center><table width= "90%" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"><tr class="ui-bar-b"><th colspan="2" class="ui-li-divider">User Details</th></tr><tr><td class="form-label">UserName:</td><td class="form-field-val">{0}</td></tr><tr><td class="form-label">Last Name:</td><td class="form-field-val">{1}</td></tr><tr><td class="form-label">First Name:</td><td class="form-field-val">{2}</td></tr><tr><td class="form-label">Email Address:</td><td class="form-field-val">{3}</td></tr><tr><td class="form-label">Roles:</td><td class="form-field-val">{4}</td></tr></table></center></div></div>';
		this.getMain().html($.format(html, emp.userName, emp.lastName,  emp.firstName + emp.middleName, emp.emailId, emp.roles));
		this.clearFoot();
	},
	getMain: function() {
		if (!this.main) {
			this.main = $('#main-base');
		}
		return this.main;
	},
	clearFoot: function(){
		$('#ag-footer').html('');
	},
	getUserDetailsromServer: function(recordId) {
		aglite.Mobile.invokeServiceMethod({
			methodName:'userService.listUserDetailsForAndroid',
			params:([String(recordId)]),
			callback: function(data, status, response) {
				aglite.Mobile.offline.showUserDetails(data.data);
			}
		});
	},
	getUserListFromServer: function(nextPage) {
		aglite.Mobile.invokeServiceMethod({
			methodName:'userService.listUsersForAndroid',
			//params:([String(1)]),
			callback: function(data, status, response) {
				aglite.Mobile.offline.showUserList(nextPage, data.data);
			}
		});
	}
};
