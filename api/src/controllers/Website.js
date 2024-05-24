const User = require("../model/UserAuth");
const Website = require("../model/Website");
const Component = require("../model/Component");



exports.addWebsite = async (req, res) => {
  try {
    const userId = req.user.id;

    const newWebsite = new Website({
      ...req.body,
      userId
    });

    await newWebsite.save();

    res.status(201).json({ website: newWebsite, success: true, message: 'Website added to user successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getWebsite = async (req, res) => {
  try {
    const webId = req.params.id;

    const website = await Website.findById(webId);
    res.status(200).json({ website: website, success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.updateWebsite = async (req, res) => {
  try {
    const { websiteName, websiteBody } = req.body;
    const website = await Website.findById(req.params.id);

    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    website.websiteName = websiteName;
    website.websiteBody = websiteBody;

    await website.save();

    res.json({ website: website, success: true, message: 'Website updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getAllWebsites = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = User.findById(userId);
    let websites = [];
    if (user.profileType === 'admin') {
      websites = await Website.find().populate({
        path: 'userId',
        select: 'fullName'
      });

    } else {
      websites = await Website.find({ userId });
    }
    res.json(websites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};



exports.delWebsite = async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);

    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    await Website.findByIdAndDelete(website._id);

    res.json({ message: 'Website deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.createPage = async (req, res) => {
  try {
    const { websiteId, pageName, pageLayout, pageLayoutNumber, components } = req.body;
    const newComponent = new Component({
      websiteId,
      seqNo: generateSeqNo(),
      pageName,
      pageLayout,
      pageLayoutNumber,
      components
    });


    const savedComponent = await newComponent.save();


    res.status(201).json(savedComponent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllPage = async (req, res) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
function generateSeqNo() {
  return Math.floor(Math.random() * 1000);
}

exports.getPage = async (req, res) => {
  try {
    const component = await Component.find({ websiteId: req.params.id });
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }
    res.json({ status: 200, pages: component });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
exports.getSinglePage = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }

    let groups = [];
    let currentGroup = [];
    let currentWidth = 0;

    for (const comp of component.components) {
      const width = parseInt(comp.width);
      if (currentWidth + width <= 100) {
        currentGroup.push(comp);
        currentWidth += width;
      } else {
        groups.push(currentGroup);
        currentGroup = [comp];
        currentWidth = width;
      }
    }

    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    // Building the modified response object
    const modifiedResponse = {
      status: 200,
      pages: {
        pageName: component.pageName,
        groups,

      }
    };

    res.json(modifiedResponse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deletePage = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }
    await component.remove();
    res.json({ message: 'Component removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};