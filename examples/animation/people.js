tabris.load(function() {

  var IMAGE_PATH = "images/";
  var IMAGE_SIZE = 128;
  var THUMB_SIZE = 64;
  var MARGIN_SMALL = 4;
  var MARGIN = 12;
  var MARGIN_LARGE = 24;
  var ANIMATION_START_DELAY = 500;

  var people = [
    ["Holger", "Staudacher", "holger.jpg"],
    ["Ian", "Bull", "ian.jpg"],
    ["Jochen", "Krause", "jochen.jpg"],
    ["Jordi ", "Böhme López", "jordi.jpg"],
    ["Markus ", "Knauer", "markus.jpg"],
    ["Moritz", "Post", "moritz.jpg"],
    ["Tim", "Buschtöns", "tim.jpg"]
  ].map(function(element) {
    return {firstName: element[0], lastName: element[1], image: IMAGE_PATH + element[2]};
  });

  function animateInFromBottom(widget, i) {
    widget.set({
      opacity: 0.0,
      transform: {
        translationY: THUMB_SIZE / 2
      }
    });
    tabris.create("tabris.Animation", {
      target: widget,
      delay: i * 100 + 800 + ANIMATION_START_DELAY,
      duration: 200,
      easing: "ease-in-out",
      properties: {
        opacity: 1.0,
        transform: {
          translationY: 0
        }
      }
    }).on("Completion", function() {
      this.dispose();
    }).call("start");
  }

  function animateInFromRight(widget, delay) {
    widget.set({
      opacity: 0.0,
      transform: {
        translationX: 32
      }
    });
    tabris.create("tabris.Animation", {
      target: widget,
      duration: 500,
      delay: delay,
      easing: "ease-out",
      properties: {
        opacity: 1.0,
        transform: {
          translationX: 0
        }
      }
    }).on("Completion", function() {
      this.dispose();
    }).call("start");
  }

  function animateInScaleUp(widget, delay) {
    widget.set("opacity", 0.0);
    tabris.create("tabris.Animation", {
      target: widget,
      delay: delay,
      duration: 400,
      easing: "ease-out",
      properties: {
        opacity: 1.0,
        transform: {
          scaleX: 1.0,
          scaleY: 1.0
        }
      }
    }).on("Completion", function() {
      this.dispose();
    }).call("start");
  }

  function animateOutLeftCreateCurrentPerson(person) {
    tabris.create("tabris.Animation", {
      target: curPersonDetailComposite,
      duration: 500,
      easing: "ease-out",
      properties: {
        opacity: 0.0,
        transform: {
          translationX: -64
        }
      }
    }).on("Completion", function() {
      this.dispose();
      curPersonDetailComposite.dispose();
      curPersonDetailComposite = createPersonDetail(personDetailsCompositeParent, person, 0);
    }).call("start");
  }

  function createPersonDetail(parent, person, delay) {
    var composite = tabris.create("Composite", {
      layoutData: {left: 0, right: 0, top: 0, height: IMAGE_SIZE + MARGIN_LARGE}
    });
    var imageLabel = tabris.create("Label", {
      image: {src: person.image, width: IMAGE_SIZE, height: IMAGE_SIZE},
      transform: {
        scaleX: 0.75,
        scaleY: 0.75
      },
      opacity: 0.0
    });
    var nameLabel = tabris.create("Label", {
      layoutData: {left: [imageLabel, MARGIN], top: 0},
      text: person.firstName + " " + person.lastName,
      font: "bold 18px"
    });
    var professionLabel = tabris.create("Label", {
      layoutData: {left: [imageLabel, MARGIN], top: [nameLabel, MARGIN]},
      text: "Software developer"
    });
    var companyLabel = tabris.create("Label", {
      layoutData: {left: [imageLabel, MARGIN], top: [professionLabel, MARGIN_SMALL]},
      text: "EclipseSource"
    });
    var mailLabel = tabris.create("Label", {
      layoutData: {left: [imageLabel, MARGIN], top: [companyLabel, MARGIN]},
      text: "mail@eclipsesource.com",
      font: "italic 14px"
    });
    parent.append(composite);
    composite.append(imageLabel, nameLabel, professionLabel, companyLabel, mailLabel);
    animateInScaleUp(imageLabel, delay);
    animateInFromRight(nameLabel, delay);
    animateInFromRight(professionLabel, 100 + delay);
    animateInFromRight(companyLabel, 200 + delay);
    animateInFromRight(mailLabel, 300 + delay);
    return composite;
  }

  function createPersonThumbComposite(parent, neighborComposite, person) {
    var layoutData;
    if (neighborComposite === undefined) {
      layoutData = {left: 0, top: 0};
    } else {
      layoutData = {top: 0, left: [neighborComposite, MARGIN]};
    }
    var composite = tabris.create("Composite", {
      layoutData: layoutData
    });
    var imageLabel = tabris.create("Label", {
      layoutData: {left: 0, top: 0, width: THUMB_SIZE, height: THUMB_SIZE},
      image: {src: person.image, width: THUMB_SIZE, height: THUMB_SIZE},
      data: {showTouch: true}
    });
    imageLabel.on("touchend", function() {
      animateOutLeftCreateCurrentPerson(person);
    });
    var firstNameLabel = tabris.create("Label", {
      alignment: "center",
      layoutData: {left: 0, top: [imageLabel, 0], width: THUMB_SIZE},
      text: person.firstName
    });
    parent.append(composite);
    composite.append(imageLabel, firstNameLabel);
    return composite;
  }

  function createPersonThumbComposites(parent) {
    var composite;
    for (var i = 0; i < people.length; i++) {
      composite = createPersonThumbComposite(parent, composite, people[i]);
      animateInFromBottom(composite, i);
    }
  }

  var page = tabris.create("Page", {
    title: "People",
    topLevel: true
  });

  var personDetailsCompositeParent = tabris.create("Composite", {
    layoutData: {left: MARGIN, top: MARGIN_LARGE, right: MARGIN}
  });

  var curPersonDetailComposite = createPersonDetail(personDetailsCompositeParent, people[2], ANIMATION_START_DELAY);

  var peopleComposite = tabris.create("Composite", {
    layoutData: {left: MARGIN, top: [personDetailsCompositeParent, MARGIN]}
  });

  page.append(personDetailsCompositeParent, peopleComposite);
  createPersonThumbComposites(peopleComposite);

  page.open();

});
