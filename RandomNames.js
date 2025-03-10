class RandomNames{     
    constructor(disBuilder){
        this.residential = [
            "Stonehaven Square",
            "Elmwood Quarter",
            "Willow Grove",
            "Maplewood Village",
            "Rosebush Terrace",
            "Oakshade Hamlet",
            "Cedar Ridge",
            "Birchwood Close",
            "Pinehurst Heights",
            "Aspen Row",
            "Linden Lane",
            "Cherry Orchard",
            "Hollybrook",
            "Sycamore End",
            "Alder Alley",
            "Hazelwood",
            "Poplar Path",
            "Juniper Court",
            "Beechwood",
            "Spruce View",
            "Cypress Cove",
            "Magnolia Mews",
            "Ivycrest",
            "Elderberry Estate",
            "Hawthorn Heights",
            "Jew Yard",
            "Chestnut Court",
            "Dogwood Drive",
            "Larch Lane",
            "Firfield",
            "Aspen Meadows",
            "Birchtree Bend",
            "Glenwood Green",
            "Ashwood",
            "Willow Walk",
            "Rowan Rise",
            "Hickory Heights",
            "Wisteria Way",
            "Dovecote Dell",
            "Treetop Terrace",
            "Garden Gate",
            "Meadowview",
            "Thornhill",
            "Greenfield Grove",
            "Foxglove Fold",
            "Sunset Ridge",
            "Riverside Retreat",
            "Pine Needle Path",
            "Mossy Glen",
            "Fernwood"
        ];
        this.warehouse = [
            "Ironworks Yard",
            "Quarry Quarters",
            "Dockside Depot",
            "Timberland",
            "Granary Gardens",
            "Stockpile Street",
            "Supply Shores",
            "Millstone Mills",
            "Coal Carriage",
            "Stowaway Square",
            "Cargo Crossing",
            "Merchant's Row",
            "Goods Grounds",
            "Warehouse Way",
            "Barrel Bend",
            "Cartwright Court",
            "Lumber Lane",
            "Freight Front",
            "Anchor Alley",
            "Crate Crescent",
            "Silo Street",
            "Harbor Halls",
            "Storage Steppes",
            "Vault Vale",
            "Brickworks Bay",
            "Cargo Cove",
            "Shipment Shore",
            "Dock Docks",
            "Stowage Straits",
            "Cargo Court",
            "Warehouse Wharf",
            "Yardlands",
            "Freight Yard",
            "Goodsway",
            "Grain Gate",
            "Stock Street",
            "Depot Drive",
            "Loading Landing",
            "Crate Court",
            "Harbor Halls",
            "Pier Pavilion",
            "Stockpiler's Square",
            "Bay Barrel",
            "Quayside Quarters",
            "Shipment Shores",
            "Anchor's End",
            "Depot Docks",
            "Timber Trace",
            "Millstone Mile",
            "Harbormaster's Haven"
        ];
        this.market = [
            "Merchant's Way",
            "Bargain Bazaar",
            "Peddler's Plaza",
            "Trade Town",
            "Commerce Court",
            "Barter Boulevard",
            "Trader's Triangle",
            "Marketplace Mile",
            "Vendor's Vale",
            "Shopkeeper's Square",
            "Retail Row",
            "Exchange End",
            "Seller's Strip",
            "Market Cross",
            "Commerce Corner",
            "Vendor's Village",
            "Peddler's Path",
            "Trade Terrace",
            "Hawker's Hill",
            "Merchant's Mall",
            "Bazaar Bend",
            "Merchant's Meander",
            "Trader's Trail",
            "Market Mews",
            "Retail Ridges",
            "Vendor's View",
            "Barter Bend",
            "Exchange Esplanade",
            "Seller's Square",
            "Shopkeeper's Street",
            "Merchant's Market",
            "Trade Trestle",
            "Hawker's Haven",
            "Bazaar Basin",
            "Merchant's Meadow",
            "Market Meadow",
            "Vendor's Vista",
            "Peddler's Park",
            "Exchange Edge",
            "Commerce Cliffs",
            "Bazaar Bay",
            "Shopkeeper's Spur",
            "Retail Ridge",
            "Trader's Thicket",
            "Merchant's Moor",
            "Vendor's Vale",
            "Market Mount",
            "Hawker's Hold",
            "Exchange Embankment",
            "Bazaar Bayou"
        ];
        this.port=[
            "Harbor Heights",
            "Seafarer's Square",
            "Docklands",
            "Anchorage Alley",
            "Maritime Mile",
            "Sailor's Sanctuary",
            "Portside Park",
            "Anchor's Abode",
            "Dockside Domain",
            "Pier Place",
            "Seafarer's Street",
            "Harbor Haven",
            "Marine Market",
            "Harborside Hamlet",
            "Nautical Nook",
            "Captain's Cove",
            "Sailor's Span",
            "Quayside Quarter",
            "Bayfront Boulevard",
            "Seaside Square",
            "Harbor Halls",
            "Waterfront Way",
            "Sailor's Strip",
            "Dockyard Drive",
            "Marine Meadow",
            "Port Pavilion",
            "Seafarer's Station",
            "Harborside Haven",
            "Mariner's Mile",
            "Pier Plaza",
            "Quayside Quarters",
            "Harbor Haven",
            "Anchorage Avenue",
            "Seafarer's Strand",
            "Sailor's Shore",
            "Dogside Docks",
            "Bay Bridge",
            "Port Path",
            "Seaside Shores",
            "Anchor Alley",
            "Marine Market",
            "Nautical Nook",
            "Bayfront Bay",
            "Pier Pavilion",
            "Quay Court",
            "Docklands Drive",
            "Mariner's Meadow",
            "Sailor's Seat",
            "Harborside Hall",
            "Quayside Quarters"
        ];
        this.castle=[
            "Fortress Heights",
            "Knight's Keep",
            "Royal Ridge",
            "Castle Court",
            "Noble Nook",
            "Lord's Landing",
            "Guardians' Gate",
            "Bastion Bay",
            "Citadel Circle",
            "Palace Promenade",
            "Fortification Fields",
            "Regal Road",
            "Baron's Boulevard",
            "Chateau Crescent",
            "Knight's Nook",
            "Castle Close",
            "Fortress Fells",
            "Royal Realm",
            "Castle Canyon",
            "Monarch's Manor",
            "Noble Nest",
            "Baron's Bastion",
            "Citadel Crest",
            "Palace Plaza",
            "Lord's Landing",
            "Guardian's Gate",
            "Fortress Fields",
            "Regal Rise",
            "Castle Cove",
            "Knight's Keep",
            "Fortress Front",
            "Palace Park",
            "Baron's Bend",
            "Castle Crag",
            "Noble Nook",
            "Citadel Circle",
            "Regal Rise",
            "Guardians' Ground",
            "Monarch's Mews",
            "Palace Path",
            "Castle Crown",
            "Baron's Boulevard",
            "Fortress Fells",
            "Royal Ridge",
            "Guardians' Grove",
            "Citadel Court",
            "Knight's Knoll",
            "Noble Niche",
            "Palace Peak",
            "Castle Crest"
        ];
        this.slums = [
            "Shantytown",
            "Gutter's End",
            "Mud Market",
            "Ragged Row",
            "Fisher's Flats",
            "Beggar's Bend",
            "Slum Street",
            "Hovel Hollow",
            "Backwater Boulevard",
            "Squalor Square",
            "Alleyway Acres",
            "Grime Grounds",
            "Poverty Path",
            "Vagrant's Vale",
            "Wretched Walk",
            "Desolate Drive",
            "Rusty Road",
            "Crumbled Court",
            "Shabby Shore",
            "Broken Bridge",
            "Gutter Gulch",
            "Tattered Terrace",
            "Shamble Street",
            "Blight Bend",
            "Destitute Drive",
            "Miser's Mile",
            "Downcast Alley",
            "Ruin's Reach",
            "Forsaken Fields",
            "Beggar's Bane",
            "Grubby Gate",
            "Dismal District",
            "Downtrodden Lane",
            "Ragpicker's Road",
            "Sorrow's Span",
            "Tattered Town",
            "Drifter's Den",
            "Beggar's Barrow",
            "Sordid Square",
            "Wretch's Way",
            "Beggar's Bight",
            "Despair Dock",
            "Shanty Shores",
            "Muckraker's Mews",
            "Misery Meadows",
            "Poorhouse Path",
            "Ruin's Rest",
            "Squalid Settlement",
            "Shabby Shanties"
        ];
        this.num=50;
        this.string = "";
        this.names = new Array();
        this.availableNames = [
            this.residential,
            this.warehouse,
            this.market,
            this.port,
            this.castle,
            this.slums
        ];

        for (let i = 0; i < disBuilder.numOfDist(); i++) {
            let type = disBuilder.getDist(i).getType();
            let table = this.availableNames[type];
            if( table == null){
                console.log(type);
            }
            let randIndex = Math.floor(Math.random() * table.length);
            let randName = table[randIndex];
            table.splice(randIndex, 1);
            this.names.push({ name: randName, district: disBuilder.getDist(i) });
        }
    }
    getNames(){
        return this.names;
    }
}