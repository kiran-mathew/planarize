/*!
 * App.js
 * Basic page application.
 * 
 * Copyright (c) 2016, A (Keith) Parent Design
 * http://www.keithparent.com
 *
 * Licensed under the MIT license.
 * https://www.opensource.org/licenses/mit-license.php
 *
 */

// Define module exports
(function(root, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(function() {
			return factory(root);
		});
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = factory();
	} else {
		// root = (Environ == Browser||Server) ? window : global
		root.App = factory();
	}
}(this, function(root) {

	'use strict';

	/**
	 * Create local namespace using either jQuery global reference, 
	 * or an empty opject literal.
	 */
	var App = $.App || {};
	if (App.fn) { return; }

	$.App = {
		
		init: function(options) {
			
			var settings = {
				context: '[data-grid="perlineitem"]',
				line: '[data-grid="lineitem"]',
				runningdisplay: '[data-grid="running"]',
				quantitydisplay: '[data-grid="qty"]'
			};
			
			if (typeof options == "string") { settings.context = options; }
			var options = $.extend(settings, options);

			// if no options are passed and no default selector exists, do not pass 'Go'.
			if (!$(options.context).length) { return; }
			
			// for each instance of module
			var $itemgrid = $(options.context);
			$itemgrid.each(function() {
				
				var $items = $(this),
					$item = $items.find(options.line);
					
				$item.each(function() {
					$.App.initItem($(this));
				});
				
			});
			
		},
		
		initItem: function($item) {
			
			$item.info = $.App.getItemData($item);
			
			$.App.bindItemCtrls($item);
			$.App.updateItem($item);
			
		},
		
		/**
		 * Create Item Object - creates an 'item' object literal from passed object's data attributes
		 * @param {jQuery Object} item
		 * @return {Object} lineitem
		 * 
		 */
		getItemData: function($item) {
			
			return $item = {
				'Id'		:	$item.data("pid"),
				'Qty'		: 	$item.data("qty"),
				'Price'		: 	$item.data("unitprice"),
				'Shipping'	: 	$item.data("shipping")
			};

		},
		
		bindItemCtrls: function($item) {
			
			var ui_events = 'keydown keyup keypress focus blur paste change',
				numberInput = 'input[type="number"]';
			
			$item
				.off(ui_events, numberInput)
				.on(ui_events, numberInput, function(event) {
					
					var $ctrl = $(this),
						min = $ctrl.attr('min'),
						val = $ctrl.val();
					
					if (event.type == 'blur') {
						if (val <= min || val == '') {
							val = min;
							$ctrl.val(min);
						}
					}
					
					$item.info.Qty = val;
					$item.data('qty', val);
					
					$.App.updateItem($item);
					
				});
			
		},		
		updateShipping: function($item) {
			
			var rule = $item.find('[data-shipping-rule]').data('shipping-rule'),
				shippingprice = $item.find('[data-shipping-price]').data('shipping-price'),
				unitprice = accounting.toFixed($item.Price, 2),
				shipclass = ['text-muted', 'free-shipping'],
				isFree = false
			;

			if ($qtyinput.val() == 0) {
				$shippingpriceholder.html('');
				return;
			}

			switch (rule) {
				case "Standard":
					if (shippingprice == '0' || shippingprice == '0.00') {
						isFree = true;
					}
				break;
				case "PerLineItemShippingThreeorMoreFree":
					if ($qtyinput.val() > 2) {
						isFree = true;
					}
				break;
				case "FlatRate695":
				default:
					if ((unitprice * $qtyinput.val()) > 249) {
						isFree = true;
					} else {
						shippingprice = '6.95';
					}
				break;
			}
			
			var shipclassActive = shipclass[0];
			
			if (isFree) {
				shipclassActive = shipclass[1];
				shippingprice = 'Free Shipping';
			} else {
				shippingprice = accounting.formatMoney(accounting.toFixed(shippingprice, 2), '$');
				if (shippingprice === '$0.00') { return; }
			}
			
			var shippingTpl = [
				'<dl class="product-shipping-price ' + shipclassActive + '">',
					'<dt>Shipping</dt>',
					'<dd>' + shippingprice + '</dd>',
				'</dl>'
			].join('');
			
			// add mark-up to DOM
			// TEMP: only write to DOM if shipping is free, otherwise write nothing
			// TODO: remove ternary conditional and false 'reset' to show any/all shipping prices
			$shippingpriceholder.html( isFree ? shippingTpl : '' );
			
		},
		
		formatPrice: function(price) {
			return accounting.formatMoney( price );
		},
		
		subtotalItem: function($item) {
			var $itemSubtotal = $item.Qty * $item.Price;
			return $.App.formatPrice($itemSubtotal);
		},
		
		updateItem: function($item) {
			
			var $subtotal = $.App.subtotalItem($item.info);
			$item.find('[data-grid="runningsubtotal"]').text($subtotal);
			
			$.App.updateTotals($item);
			
		},
		
		totalItems: function($item) {
			
			var $items = $item.parents('[data-grid="perlineitem"]'),
				$total = $items.find('[data-grid="runningtotal"]'),
				$runningTotal = accounting.unformat($total.val());
			
			$items.find('[data-grid="lineitem"]').each(function() {
				var $ubtotal = $(this).find('[data-grid="runningsubtotal"]');
				$runningTotal += accounting.unformat($ubtotal.text());
			});
			
			return $.App.formatPrice($runningTotal);
			
		},
		
		totalQty: function($item) {
			
			var $items = $item.parents('[data-grid="perlineitem"]'),
				$qtyCount = 0;
				
			$items.find('[data-grid="lineitem"]').each(function() {
				var $qty = $(this).data('qty');
				$qtyCount += parseFloat($qty);
			});
			
			return $qtyCount;
			
		},
		
		updateTotals: function ($item) {
			
			var $items = $item.parents('[data-grid="perlineitem"]'),
				$total = $items.find('[data-grid="runningtotal"]'),
				$totalqty = $items.find('[data-grid="qtytotal"]');
			
			$total.text($.App.totalItems($item));
			$totalqty.text($.App.totalQty($item));
			
		},
		
		setCurrency: function() {
	
			var selectCurrency = '[data-select="currency"]',
				$selectCurrency = $(selectCurrency),
				$selected = '$',//$selectCurrency.find(':selected'),
				$datagrid = $selectCurrency.closest('[data-grid="perlineitem"]');
			
			function updateOptions(option) {
				
				// Settings object that controls default parameters for library methods:
				accounting.settings = {
					currency: {
						symbol : option.val(),   // default currency symbol is '$'
						format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
						decimal : (option.data('locale') === 'european') ? "," : ".",  // decimal point separator
						thousand: (option.data('locale') === 'european') ? "." : ",",  // thousands separator
						precision : 2   // decimal places
					},
					number: {
						precision : 0,  // default precision on numbers is 0
						thousand: (option.data('locale') === 'european') ? "." : ",",
						decimal : (option.data('locale') === 'european') ? "," : "."
					}
				}
				
			}
			
			$(document)
				.off('change.currency', selectCurrency, function() {})
				.on('change.currency', selectCurrency, function() {
					var $selected = $(this).find(':selected');
					updateOptions($selected);
				});
				
			// run once on load to init accounting plugin options
			//updateOptions($selected);
		 	
		}
		
	}
	
}));


// jQuery onDOMReady
$(function() {
	
	// load in Open Exchange Rate data via API
	//$.App.getOpenExchangeRate();
	
	$.App.setCurrency();
	$.App.init();
	
	// Demo purposes only
	$('.product').on('click', 'a', function (event) { event.preventDefault(); });
	
});
