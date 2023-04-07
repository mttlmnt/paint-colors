require "nokogiri"
require "httparty"
require "pry"

Color = Struct.new(:code, :name, :image_path, :is_cool) do
end

def extract_page(page, letter:)
  file_name = "_pages/#{letter}_#{page}.html"

  return if !File.exists?(file_name)

  # puts("#{letter}, #{page}")

  doc = Nokogiri::HTML(File.read(file_name))
  trs = doc.xpath("//table//table//tr")
  images_tr = trs[1]
  image_paths = images_tr.xpath("td/a/img").map { |x| x[:src] }
  names_tr = trs[2]
  names = names_tr.xpath("td").children.map { |c| c.text.strip }
  codes_tr = trs[3]
  codes = codes_tr.xpath("td").children.map { |c| c.text.strip } 
  
  codes.zip(names, image_paths).map { |item|
    name = item[1]
    is_cool = name.end_with?("\n             cc")
    name.sub!("\n             cc", "")
    Color.new(item[0], name, item[2], is_cool)
  }
end

def process(letter:)
  colors = []
  (1..1000).each { |i| 
    page_colors = extract_page(i, letter: letter)
    colors.concat(page_colors) if page_colors
  }
  colors
end

colors = []

("a".."z").each { |l| 
  colors.concat(process(letter: l))
}

unique_colors = {}

colors.each { |color|
  unique_colors[color.code] = color 
}

cool_colors = unique_colors.filter { |k, v| v.is_cool }
cool_colors.each{ |k, v| puts "#{v.code},#{v.name},#{v.image_path},#{v.is_cool}"}
# puts cool_colors

return

###

def process_page(page, letter:)
  response = HTTParty.get("https://www.resene.co.nz/swatches/search.php?page=#{page}&type=letter&letter=#{letter}")

  return if response.body.include?("No swatches found")

  puts("#{letter}, #{page}")
  
  open "_pages/#{letter}_#{page}.html", "wb" do |io|
    io.write(response.body)
  end
end

def process(letter:)
  for i in (1..1000) do 
    return if !process_page(i, letter: letter)
  end
end

("a".."z").each { |l| process(letter: l) }
