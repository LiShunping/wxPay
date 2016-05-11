FastClick.attach( document.body );
var amountEle = $('#amount-display').find('.amount');
$('#input-board').on('click', 'td', function(e) {
	var el = $(this),
		val,
		amount = amountEle.html(),
		len = amount.length,
		newAmount,
		oddLength,
		hasPoint = (/\./).test(amount);
	val = el.data('name');
	if(val !== 12 && val !== '.') {
		newAmount = amount + val;
		oddLength = hasPoint ? (newAmount.split('.')[1].length) : 0;
		if(Number(newAmount) <= 50000 && oddLength <= 2) {
			if(!(!hasPoint && len && Number(newAmount) === 0)) {
				amountEle.html(newAmount);
				len++;
			}
		}
	} else if(val === '.' && !hasPoint) {
		if(len) {
			amountEle.html(amount + val);
			len++;
		} else {
			amountEle.html('0.');
			len = 2;
		}
	} else if(val === 12 && len > 0) {
		amountEle.html(amount.slice(0, len - 1));
		len--;
	}
	if(len > 0) {
		$('#amount-display .delete').addClass('btn-show');
		$('#wx-pay').addClass('pay-enable');
	} else if(len === 0) {
		$('#amount-display .delete').removeClass('btn-show');
		$('#wx-pay').removeClass('pay-enable');
	}
});
$('#amount-display').on('click', '.delete', function(e) {
	amountEle.html('');
	$('#wx-pay').removeClass('pay-enable');
	$(this).removeClass('btn-show');
});
$('#wx-pay').on('click', function(e) {
	var amount = Number(amountEle.html());
	if($(this).hasClass('pay-enable')) {
		wxPay(amount);
	}
});