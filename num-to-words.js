class NumToWords {

    constructor(lang) {
        let langs = ['sw', 'en'];
        if (!langs.includes(lang))
            throw new Error('Unimplemented language ' + lang);

        this.lang = lang;
        this.maxZeros=12;
        this.accuracy=2;
    }

    convert(num) {
        if (isNaN(num))
            throw new Error(num + " is not a number");

        return console.log(this['numberToWords' + this.lang.toUpperCase()](num.toFixed(this.accuracy)));
    }

    numberToWordsSW(numberStr) {

        if(parseFloat(numberStr)<0){
            //Anza hasi na ndoa alama ya hasi
            return 'Hasi '+this.numberToWordsSW(numberStr.substring(1)).toLowerCase();
        }
        
        let jibu = '';
        let nums = numberStr.split(".");
        const masifuri = { 2: 'Mia', 3: 'Elfu', 5: 'Laki', 6: 'Milioni', 9: 'Bilioni', 12: 'Trilioni' };
        const makumi = ['Kumi', 'Ishirini', 'Thelathini', 'Arobaini', 'Hamsini', 'Sitini', 'Sabini', 'Themanini', 'Tisini'];
        const mamoja = ['Sifuri', 'Moja', 'Mbili', 'Tatu', 'Nne', 'Tano', 'Sita', 'Saba', 'Nane', 'Tisa'];

        //Mamia na zaidi
        if (nums[0].length > 2) {

            let nafasiZaSifuri = nums[0].length - 1;
            let baki;
        
            if (nafasiZaSifuri == 2 || nafasiZaSifuri == 5) {//Mamia, Malaki...baki ni moja tu
                baki=1;
                jibu += masifuri[nafasiZaSifuri] + ' ' + this.numberToWordsSW(nums[0].substring(0, baki)).toLowerCase();
            } else{//Maelfu na zaidi isipokuwa Malaki

                //Chiki kama we are past....999 trilion
                if(nums[0].length>this.maxZeros+3)
                    baki=nums[0].length-this.maxZeros;
                else
                    baki=(nafasiZaSifuri % 3)+1;

                //Kama namba ni milion,bilioni,trilioni katika mamoja...anza na Milioni,Bilion n.k kama 
                //Sivyo anza na namba kwanza kuepusha mgongano kama 11,000,000 na 10,000,001
                if(baki==1)
                    jibu += masifuri[nums[0].length - baki] + ' ' + this.numberToWordsSW(nums[0].substring(0, baki)).toLowerCase();
                else
                    jibu += this.numberToWordsSW(nums[0].substring(0, baki))+' '+masifuri[nums[0].length - baki].toLowerCase();

            }

            if (nums[0].substring(baki) > 0) {

                let nambaYaMbele = parseInt(nums[0].substring(baki)).toString();

                if (nums[0].substring(baki, baki + 1) == 0
                    && nambaYaMbele.length != 5||nafasiZaSifuri == 2)//Kama ni 0 mbele, pata namba kamili kwanza, isipokuwa (maelfu yenye makumi) Au (Mamia)
                    jibu += ' na ' + this.numberToWordsSW(nambaYaMbele).toLowerCase();
                else//Kama ni zaidi ya 10
                    jibu += ', ' + this.numberToWordsSW(nambaYaMbele).toLowerCase();
            }

        } else if (nums[0].length == 2 && nums[0] > 0) {//Makumi

            //Idadi ya makumi
            if (nums[0][0] > 0)
                jibu += makumi[nums[0][0] - 1];

            //Kama mamoja ni zaidi ya 0
            if (nums[0][1] > 0) {
                jibu += ' na ' + mamoja[nums[0][1]].toLowerCase();
            }

        } else {//Mamoja
                jibu = mamoja[nums[0]];
        }

        //Senti
        if (nums.length > 0) {
            let senti = parseInt(nums[1]);
            if (senti > 0) {
                jibu += ' na senti ' + this.numberToWordsSW(senti.toString()).toLowerCase();
            }
        }


        return jibu;
    }


    numberToWordsEN(numberStr){
        console.error("English not implemented");
    }

}
