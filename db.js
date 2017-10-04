

mongoose.connect('mongodb://localhost/microverse',{
  useMongoClient: true,
  /* other options */
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're succesfully connected!")
});


var eventSchema = new Schema(
	{
		title: String,
		description: String,
		date: { type: Date, default: Date.now}

	}
);

var event = mongoose.model('event', eventSchema);

var newEvent = new event({
	title: "new event title",
	description: "just another description"
});

console.log("The new event title is " + newEvent.title);

newEvent.save();



db.close();