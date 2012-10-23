define([
	'popupController',
	'jquery'
], function (controller, $) {

	'use strict';

	describe('popupController', function () {

		var state = [
			{
				name: 'service 1',
				items: [
					{
						name: 'build name 1',
						group: 'build group 1',
						isBroken: false,
						url: 'http://example1.com/',
						isBuilding: true
					},
					{
						name: 'build name 2',
						group: 'build group 2',
						isBroken: true,
						url: 'http://example2.com/',
						isBuilding: false
					},
					{
						name: 'build with no group',
						group: '',
						isBroken: false,
						url: 'http://example3.com/',
						isBuilding: false
					}
				]
			},
			{
				name: 'service 2',
				items: []
			}
		];

		beforeEach(function () {
			jasmine.getFixtures().set('<div class="service-info-container">content</div>');
		});

		it('should show message if no services configured', function () {
			controller.show([]);

			expect($('.no-services-message')).toHaveText('No services configured');
			expect($('.no-services-message')).toBeVisible();
		});

		it('should not show message if at least 1 service configured', function () {
			controller.show(state);

			expect($('.no-services-message')).not.toBeVisible();
		});

		it('should show service names', function () {
			controller.show(state);

			expect($('.service-name').length).toBeGreaterThan(1);
			expect($('.service-name').eq(0)).toHaveText('service 1');
			expect($('.service-name').eq(1)).toHaveText('service 2');
		});

		it('should show build names', function () {
			controller.show(state);

			expect($('.service-item-name').length).toBeGreaterThan(1);
			expect($('.service-item-name').eq(0)).toHaveText('build name 1');
			expect($('.service-item-name').eq(1)).toHaveText('build name 2');
		});

		it('should show group names', function () {
			controller.show(state);

			expect($('.service-group').length).toBeGreaterThan(1);
			expect($('.service-group').eq(0)).toHaveText('build group 1');
			expect($('.service-group').eq(1)).toHaveText('build group 2');
		});

		it('should not show group name if none', function () {
			controller.show(state);

			expect($('.service-item').eq(2)).toHaveText('build with no group');
		});

		it('should indicate broken build', function () {
			controller.show(state);

			expect($('.service-item').eq(1)).toHaveClass('build-broken');
		});

		it('should show if building', function () {
			controller.show(state);

			expect($('.service-item').eq(0)).toHaveClass('building');
			expect($('.service-item').eq(1)).not.toHaveClass('building');
		});

		it('should add link for each build', function () {
			controller.show(state);

			expect($('.service-item').eq(1)).toHaveClass('build-broken');
		});
	});

});