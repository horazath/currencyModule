import Actor5e from "../../systems/dnd5e/module/actor/entity.js";


    patch_longRest();
});

function patch_longRest() {
    Actor5e.prototype.convertCurrency() {
        const curr = duplicate(this.data.data.currency);
        const convert = {
          cp: {into: "sp", each: 3 },
          sp: {into: "ep", each: 4 },
          ep: {into: "gp", each: 4 },
          gp: {into: "pp", each: 4 },
        };
        for ( let [c, t] of Object.entries(convert) ) {
          let change = Math.floor(curr[c] / t.each);
          curr[c] -= (change * t.each);
          curr[t.into] += change;
        }
        return this.update({"data.currency": curr});
      }  
    };
}