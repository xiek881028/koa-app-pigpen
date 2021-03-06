module.exports = function () {
	var c = document.getElementById('evanyou-canvas'),
		x = c.getContext('2d'),
		pr = window.devicePixelRatio || 1,
		w = window.innerWidth,
		h = window.innerHeight,
		f = 90,
		q,
		m = Math,
		r = 0,
		u = m.PI * 2,
		v = m.cos,
		z = m.random;
	c.width = w * pr;
	c.height = h * pr;
	x.scale(pr, pr);
	x.globalAlpha = 0.6;
	function i() {
		x.clearRect(0, 0, w, h);
		q = [{ x: 0, y: h * .7 + f }, { x: 0, y: h * .7 - f }];
		var color = randomColor();
		while (q[1].x < w + f) { d(q[0], q[1], color); }
	}
	function randomColor() {
		return Math.floor(Math.random() * 2);
	}
	function d(i, j, color) {
		x.beginPath();
		x.moveTo(i.x, i.y);
		x.lineTo(j.x, j.y);
		var k = j.x + (z() * 2 - 0.25) * f,
			n = y(j.y);
		x.lineTo(k, n);
		x.closePath();
		r -= u / -50;
		switch (color) {
			case 0:
				x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16);
				break;
			case 1:
				x.fillStyle = '#' + (v(r) * 127 + 128 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128 << 16).toString(16);
				break;
		}
		x.fill();
		q[0] = q[1];
		q[1] = { x: k, y: n };
	}
	function y(p) {
		var t = p + (z() * 2 - 1.1) * f;
		return (t > h || t < 0) ? y(p) : t
	}
	i();
	return i
};
