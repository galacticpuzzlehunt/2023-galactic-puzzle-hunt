import{ew as e}from"./main.js";var o=(r=>(r.MOVE="move",r.REMOVE="remove",r.CLICK="click",r))(o||{});const t=e.object({type:e.literal("move"),rX:e.number(),rY:e.number()}),c=e.object({type:e.literal("remove")}),m=e.object({type:e.literal("click"),rX:e.number(),rY:e.number()});e.union([t,c,m]);export{o as C};
//# sourceMappingURL=presence-fd0463a1.js.map
