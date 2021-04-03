import JSONAPISerializer from 'jsonapi-serializer';

class AppAdapter {
    static async deserialize(dataSet) {
        const options = {};
        options.keyForAttribute = 'underscore_case';
        const jsonDeserializer = new JSONAPISerializer.Deserializer(options);
        let deseserializedData;
        try {
            deseserializedData = jsonDeserializer.deserialize(dataSet, options);
        } catch (e) {
            deseserializedData = null;
        }
        return deseserializedData;
    }
}

export default AppAdapter;
