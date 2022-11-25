class Filter {
    searchText = "";
    country = "";
    ratingMin = null;
    ratingMax = null;
    language = "";
    year = null;
    genre = [];
    durationMin = null;
    durationMax = null;
    page = 0;
    limit = 10;

    toRequest() {
        const requestObj = {};

        for(let key in this) {
            if(this[key] !== "" && this[key] !== null) {
                if((Array.isArray(this[key]) && this[key].length === 0)) {
                    continue;
                } else if(typeof this[key] === "string" && (this[key]?.toLowerCase().includes("select"))) {
                    continue;
                }

                requestObj[key] = this[key];
            }
        }

        console.log(requestObj);

        return requestObj;
    }

    loadMore() {
        this.page = this.page + 1;
    }
}

const FilterService = new Filter();

export default FilterService;