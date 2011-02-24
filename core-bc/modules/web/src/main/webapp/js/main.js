
// Instantiating a Alloy "sandbox"
AUI().ready('aui-base', 'aui-tooltip', function(A) {

	var tableHeaderTooltips;
	
	setupTooltips();
	
	// START - handling of tool tips
	function setupTooltips() {
		
		var colHeadingSpans = A.all('.main-content table th span');
		
		colHeadingSpans.each(function() {
			// variable this stands for the active node in the loop
			
			var currentTitle = this.get('title');
			
			if(currentTitle != '') {
				// java script is enabled we convert all \n to <br/> in tool-tips for line break
				var newTitle = currentTitle.replace(/\n/g, '<br />');
				currentTitle = newTitle;
				
				this.addClass('tooltip');
				this.set('title', currentTitle);
			}
			
			// Set new title attribute
			this.set('title', currentTitle);
		});
		
		tableHeaderTooltips = new A.Tooltip({
			trigger: '.main-content table th span.tooltip',
			align: { points: [ 'tc', 'bc' ] },
			width: '300px',
			title: true
		}).render();
		
	}
	// END - handling of tool tips

});
