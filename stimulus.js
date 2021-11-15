class Stimulus {
    
    orientations=[0, 90];
    adjust = [-22.5, 22.5];
    shapes = ['circle', 'square'];
    colors = ['green', 'red'];
    
    constructor(distractor=false, shape='circle', orientation=0, color='', position=[0, 0]) {
        this.distractor = distractor;
        this.shape = shape;
        // this.orientation = orientation
        this.orientation = this.getOrientation(true)
        this.color = color
        this.position = position
    }

    set current(shape) {
        this.shape = shape;
        this.orientation = this.getOrientation(false)
    }

    rand(items) {
        // "~~" for a closest "int"
        return items[~~(items.length * Math.random())];
    }

    getOrientation(adjust) {
        let initial = this.rand(this.orientations);
        if (adjust) {
            return initial + this.rand(this.adjust)
        }
        return initial
    }
    
    print() {
        return `distractor: ${this.distractor}\nshape: ${this.shape}\norientation: ${this.orientation}\ncolor: ${this.color}\ncoordinate: ${this.position}`
    }
    
}

export default Stimulus

// let stimulus = new Stimulus();
// stimulus.shape = 'square';
// console.log(stimulus.print())