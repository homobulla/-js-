// 一个异步流控制玩意儿 类似于async
// Jas是一个迷你的异步流工具
// 基于信号量机制，可以用when/now两个操作来等待/释放信号量
// 从而达到复杂的（非周期）异步流控制
// 原作者地址https://github.com/LiuJi-Jim/jas/blob/master/src/jas.js

(function() {
	const fire = (callback, obj) => {
		callback.call(obj);
	};
	let uid = 1;
	class Homo {
		constructor() {
			this.map = {};
			this.rmap = {};
		}

		when(resources, callback, obj) {
			let map = this.map,
				rmap = this.rmap,
				uid = (uid++).toString(16);   //使用16进制为啥
				// resources类型转化为array
			typeof resources === 'string' && (resources = [resources]);

			map[id] = {
				waiting: Array.from(resources), // cope rray
				callback: callback,
				obj: obj || window 
			}
            // 
			for (var i = 0, len = resources.length; i < len; ++i) {
				var res = resources[i],
					list = rmap[res] || (rmap[res] = []);
				list.push(id);
			}
			return this;
		}

		trigger(resources) {
			if (!resources) return this;
			let map = this.map,
				rmap = this.rmap;
			if (typeof resources === 'string') resources = [resources];
			for (let i = 0; i < resources.length; i++) {
				let res = resources[i];
				if (typeof rmap[res] === 'undefined') continue;
				this._release(res, rmap[res]);
				delete rmap[res];
			}
		}

		_release(res, list){
			let map = this.map,
				rmap = this.rmap;
			for (let i = 0; i <list.length; i++) {
				let uid = list[i],           // 缓存数组列表每一项
					mapoItem = map[uid],          //
					waiting = mapoItem.waiting,
					pos = Object.indexOf.call(waiting,res);
				waiting.splice(pos,1);

				if (waiting.length === 0) {
					fire(mapoItem.callback,mapoItem.obj);
					delete map[uid];
				}
			}
		}

	}

	homo = new Homo();
})();
