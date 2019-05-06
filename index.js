function isArray(ary) {
    return Object.prototype.toString.call(ary).slice(8, -1) === "Array";
}

function safeObject2(objs) {
    if (!new.target) return new safeObject2(objs);
    this.objs = objs;
}

safeObject2.prototype.getter = function(prop, def = "") {
    if (prop == null || !prop) return "";
    const isAry = isArray(prop);
    let value;
    if (isAry) {
        let idx = 0;
        value = this.objs;
        while (idx < prop.length) {
            if (value == null) return def;
            let x = prop[idx];
            value = value[x];
            idx++;
        }
    } else {
        value = Reflect.get(this.objs, prop);
    }

    return value === undefined || value == null || value !== value
        ? def
        : value;
};

safeObject2.prototype.setter = function(paths, value) {
    if (paths == null || !paths) return this.objs;
    let curValue,
        idx = 0;
    const props = [];
    paths.reduce((init, acc) => {
        props.push(acc);
        curValue = this.getter(props);
        if (typeof curValue !== "object") {
            console.log(paths[idx + 1]);
            curValue =
                Number.isInteger(props[props.length - 1]) ||
                Number.isInteger(paths[idx + 1])
                    ? []
                    : {};
        }

        if (acc === paths[paths.length - 1]) {
            curValue = value;
        }

        init[acc] = curValue;
        idx++;
        return init[acc];
    }, this.objs);

    return this.objs;
};

module.exports = safeObject2;
